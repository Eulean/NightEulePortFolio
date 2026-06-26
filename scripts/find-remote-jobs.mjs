import { mkdir, writeFile } from "node:fs/promises";
import https from "node:https";
import path from "node:path";

const profile = {
  preferredRemote: ["remote", "worldwide", "anywhere", "asia", "apac", "global"],
  timezoneFriendly: [
    "asia",
    "apac",
    "southeast asia",
    "singapore",
    "malaysia",
    "philippines",
    "indonesia",
    "thailand",
    "vietnam",
    "myanmar",
    "japan",
    "korea",
    "india",
    "australia",
    "new zealand",
    "emea",
    "utc+6",
    "utc+7",
    "utc+8",
    "async",
    "asynchronous",
    "timezone overlap",
    "time-zone overlap",
    "flexible timezone",
    "flexible time zone",
  ],
  locationPenalties: [
    "united states only",
    "us only",
    "usa only",
    "north america only",
    "canada only",
    "latin america only",
    "europe only",
    "eu only",
    "uk only",
    "must be based in",
  ],
  coreSkills: [
    ".net",
    "dotnet",
    "c#",
    "asp.net",
    "asp.net core",
    "asp net core",
    "entity framework",
    "ef core",
    "sql",
    "sql server",
    "react",
  ],
  strongSkills: [
    "typescript",
    "javascript",
    "backend",
    "full stack",
    "full-stack",
    "api",
    "rest",
  ],
  usefulSkills: [
    "golang",
    "docker",
    "aws",
    "azure",
    "postgresql",
    "sqlite",
    "reporting",
    "excel export",
    "pdf generation",
    "mvc",
    "razor",
  ],
  targetTitles: [
    ".net developer",
    ".net engineer",
    "c# developer",
    "c# engineer",
    "asp.net",
    "asp.net core",
    "backend developer",
    "backend engineer",
    "full stack developer",
    "full-stack developer",
    "full stack engineer",
    "full-stack engineer",
    "software developer",
    "software engineer",
    "web developer",
    "react developer",
    "react engineer",
  ],
  preferredSeniority: ["junior", "entry level", "entry-level", "associate", "mid", "mid-level", "intermediate"],
  seniorityPenalties: ["senior", "lead", "principal", "staff", "architect", "manager", "director", "head"],
  hardTitleExclusions: [
    "sales",
    "specialist",
    "administrator",
    "consultant",
    "account executive",
    "business development",
    "customer success",
    "product manager",
    "project manager",
    "engineering manager",
    "delivery manager",
    "scrum master",
    "data scientist",
    "data analyst",
    "data engineer",
    "machine learning",
    "ml engineer",
    "ai engineer",
    "marketing",
    "seo",
    "recruiter",
    "talent",
    "support engineer",
    "qa manager",
  ],
  avoidIfOnly: ["ruby", "rails", "php", "wordpress", "ios", "android", "blockchain", "swift", "flutter"],
};

const sources = [
  {
    name: "Remotive",
    url: "https://remotive.com/api/remote-jobs?limit=80",
    parse: (json) =>
      (json.jobs ?? []).map((job) => ({
        source: "Remotive",
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location || "Remote",
        url: job.url,
        tags: [...(job.tags ?? []), job.category].filter(Boolean),
        description: stripHtml(job.description ?? ""),
        postedAt: job.publication_date,
      })),
  },
  {
    name: "Arbeitnow",
    url: "https://www.arbeitnow.com/api/job-board-api",
    parse: (json) =>
      (json.data ?? [])
        .filter((job) => job.remote)
        .map((job) => ({
          source: "Arbeitnow",
          title: job.title,
          company: job.company_name,
          location: job.location || "Remote",
          url: job.url,
          tags: job.tags ?? [],
          description: stripHtml(job.description ?? ""),
          postedAt: job.created_at ? new Date(job.created_at * 1000).toISOString() : "",
        })),
  },
  {
    name: "RemoteOK",
    url: "https://remoteok.com/api",
    parse: (json) =>
      (Array.isArray(json) ? json.slice(1) : []).map((job) => ({
        source: "RemoteOK",
        title: job.position,
        company: job.company,
        location: job.location || "Remote",
        url: job.url,
        tags: job.tags ?? [],
        description: stripHtml(job.description ?? ""),
        postedAt: job.date,
      })),
  },
];

function stripHtml(value) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value) {
  return String(value ?? "").toLowerCase();
}

function includesAny(text, terms) {
  return terms.some((term) => hasTerm(text, term));
}

function hasTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (term === ".net") {
    return /(^|[^a-z0-9])\.net([^a-z0-9]|$)/i.test(text);
  }

  if (term === "c#") {
    return /(^|[^a-z0-9])c#([^a-z0-9]|$)/i.test(text);
  }

  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
}

function scoreJob(job) {
  const haystack = normalize(
    [job.title, job.company, job.location, job.tags.join(" "), job.description].join(" "),
  );
  const title = normalize(job.title);
  const location = normalize(job.location);
  let score = 0;
  const matched = [];

  for (const skill of profile.coreSkills) {
    if (hasTerm(haystack, skill)) {
      score += 14;
      matched.push(skill);
    }
  }

  for (const skill of profile.strongSkills) {
    if (hasTerm(haystack, skill)) {
      score += 8;
      matched.push(skill);
    }
  }

  for (const skill of profile.usefulSkills) {
    if (hasTerm(haystack, skill)) {
      score += 4;
      matched.push(skill);
    }
  }

  if (includesAny(title, profile.targetTitles)) {
    score += 10;
  }

  if (includesAny(haystack, profile.preferredSeniority)) {
    score += 12;
  }

  if (includesAny(haystack, profile.preferredRemote)) {
    score += 5;
  }

  if (includesAny(haystack, profile.timezoneFriendly)) {
    score += 10;
  }

  if (includesAny(haystack, profile.locationPenalties)) {
    score -= 14;
  }

  if (includesAny(haystack, profile.seniorityPenalties)) {
    score -= 10;
  }

  if (includesAny(haystack, profile.avoidIfOnly) && matched.length < 2) {
    score -= 14;
  }

  if (includesAny(title, profile.hardTitleExclusions)) {
    score -= 40;
  }

  const relevant = isSoftwareRole(job, matched);
  const targetFit = isTargetFit(job, matched);

  if (!relevant) {
    score -= 25;
  }

  if (!targetFit) {
    score -= 35;
  }

  if (matched.includes(".net") || matched.includes("dotnet")) {
    score += 10;
  }

  if (matched.includes("c#")) {
    score += 8;
  }

  if (matched.includes("asp.net core") || matched.includes("asp net core")) {
    score += 8;
  }

  if (matched.includes("react")) {
    score += 6;
  }

  if (matched.includes("sql") || matched.includes("sql server")) {
    score += 6;
  }

  if (includesAny(location, ["united states", "usa", "canada"]) && !includesAny(haystack, profile.timezoneFriendly)) {
    score -= 6;
  }

  return {
    ...job,
    score,
    relevant,
    targetFit,
    matched: [...new Set(matched)].slice(0, 10),
  };
}

function isSoftwareRole(job, matched) {
  const title = normalize(job.title);
  const tags = normalize(job.tags.join(" "));
  const softwareSignals = [
    "developer",
    "engineer",
    "software",
    "backend",
    "frontend",
    "full stack",
    "full-stack",
    "web",
    ".net",
    "c#",
    "asp.net",
    "react",
    "typescript",
  ];
  const nonSoftwareTitles = [
    "sales",
    "assistant",
    "operator",
    "manager",
    "director",
    "optometrist",
    "editor",
    "coordinator",
    "communications",
    "ground staff",
    "supply chain",
  ];

  if (includesAny(title, nonSoftwareTitles) && !includesAny(title, ["engineering", "engineer"])) {
    return false;
  }

  return includesAny(`${title} ${tags}`, softwareSignals) || matched.includes(".net") || matched.includes("c#");
}

function isTargetFit(job, matched) {
  const title = normalize(job.title);
  const haystack = normalize(
    [job.title, job.company, job.location, job.tags.join(" "), job.description].join(" "),
  );

  if (includesAny(title, profile.hardTitleExclusions)) {
    return false;
  }

  const hasPreferredStack =
    matched.includes(".net") ||
    matched.includes("dotnet") ||
    matched.includes("c#") ||
    matched.includes("asp.net") ||
    matched.includes("asp.net core") ||
    matched.includes("asp net core");

  const hasFrontendOrDb =
    matched.includes("react") ||
    matched.includes("sql") ||
    matched.includes("sql server") ||
    matched.includes("typescript");

  const hasTargetTitle = includesAny(title, profile.targetTitles);
  const hasSoftwareTitle = includesAny(title, [
    "developer",
    "engineer",
    "software",
    "backend",
    "full stack",
    "full-stack",
    "web",
  ]);
  const looksSenior = includesAny(haystack, profile.seniorityPenalties);

  if (looksSenior && !includesAny(haystack, profile.preferredSeniority)) {
    return false;
  }

  return hasPreferredStack && hasSoftwareTitle && (hasTargetTitle || hasFrontendOrDb);
}

function getSeniority(job) {
  const haystack = normalize([job.title, job.tags.join(" "), job.description].join(" "));

  if (includesAny(haystack, ["junior", "entry level", "entry-level", "associate"])) {
    return "Junior";
  }

  if (includesAny(haystack, ["mid", "mid-level", "intermediate"])) {
    return "Mid";
  }

  if (includesAny(haystack, ["senior", "lead", "principal", "staff", "architect"])) {
    return "Senior+";
  }

  return "Unknown";
}

function getTimezoneFit(job) {
  const haystack = normalize([job.location, job.title, job.tags.join(" "), job.description].join(" "));

  if (includesAny(haystack, profile.timezoneFriendly)) {
    return "Asia-friendly";
  }

  if (includesAny(haystack, profile.locationPenalties)) {
    return "Restricted";
  }

  return "Unclear";
}

function getTrack(job) {
  if (job.targetFit && job.score >= 24) {
    return "Strong";
  }

  if (job.relevant && job.score >= 8) {
    return "Review";
  }

  return "Weak";
}

function toScoredJobs(jobs) {
  return jobs
    .map(scoreJob)
    .map((job) => ({
      ...job,
      seniority: getSeniority(job),
      timezoneFit: getTimezoneFit(job),
      track: getTrack(job),
    }))
    .sort((a, b) => b.score - a.score);
}

function hasDesiredCoreSignals(job) {
  return (
    job.matched.includes(".net") ||
    job.matched.includes("dotnet") ||
    job.matched.includes("c#") ||
    job.matched.includes("asp.net") ||
    job.matched.includes("asp.net core") ||
    job.matched.includes("asp net core") ||
    job.matched.includes("sql server") ||
    (job.matched.includes("sql") && job.matched.includes("react"))
  );
}

function dedupeJobs(jobs) {
  const seen = new Set();
  const result = [];

  for (const job of jobs) {
    const key = normalize(`${job.company}-${job.title}-${job.url}`).replace(/\W+/g, "");
    if (!job.title || !job.url || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(job);
  }

  return result;
}

async function fetchSource(source) {
  const json = await fetchJson(source);
  return source.parse(json);
}

async function fetchJson(source) {
  try {
    const response = await fetch(source.url, {
      headers: {
        "User-Agent": "NightEulePortfolioJobFinder/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${source.name} returned ${response.status}`);
    }

    return response.json();
  } catch (error) {
    try {
      return await fetchJsonWithLocalCertificateFallback(source);
    } catch (fallbackError) {
      throw new Error(`${error.message}; fallback failed: ${fallbackError.message}`);
    }
  }
}

async function fetchJsonWithLocalCertificateFallback(source) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      source.url,
      {
        rejectUnauthorized: false,
        headers: {
          "User-Agent": "NightEulePortfolioJobFinder/1.0",
          Accept: "application/json",
          "Accept-Encoding": "identity",
        },
      },
      (response) => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (!response.statusCode || response.statusCode >= 400) {
            reject(new Error(`${source.name} returned ${response.statusCode}`));
            return;
          }

          try {
            resolve(JSON.parse(body));
          } catch {
            reject(new Error(`${source.name} returned invalid JSON`));
          }
        });
      },
    );

    request.on("error", reject);
  });
}

function renderReport(jobs, failures) {
  const now = new Date().toISOString().slice(0, 10);
  const scoredJobs = toScoredJobs(jobs);
  const topJobs = scoredJobs.filter((job) => job.relevant && job.targetFit && job.score >= 24).slice(0, 20);
  const reviewJobs = scoredJobs
    .filter(
      (job) =>
        job.relevant &&
        job.track === "Review" &&
        hasDesiredCoreSignals(job) &&
        !includesAny(normalize(job.title), profile.hardTitleExclusions),
    )
    .slice(0, 15);
  const relevantCount = scoredJobs.filter((job) => job.relevant).length;
  const targetFitCount = scoredJobs.filter((job) => job.targetFit).length;
  const strongCount = scoredJobs.filter((job) => job.track === "Strong").length;
  const reviewCount = scoredJobs.filter(
    (job) =>
      job.relevant &&
      job.track === "Review" &&
      hasDesiredCoreSignals(job) &&
      !includesAny(normalize(job.title), profile.hardTitleExclusions),
  ).length;

  const rows = topJobs
    .map((job, index) => {
      const matched = job.matched.length ? job.matched.join(", ") : "remote/general";
      return `| ${index + 1} | ${escapeCell(job.source)} | ${escapeCell(job.title)} | ${escapeCell(job.company)} | ${escapeCell(job.location)} | ${job.seniority} | ${job.timezoneFit} | ${job.score} | ${escapeCell(matched)} | [Apply](${job.url}) |`;
    })
    .join("\n");

  const reviewRows = reviewJobs
    .map((job, index) => {
      const matched = job.matched.length ? job.matched.join(", ") : "remote/general";
      return `| ${index + 1} | ${escapeCell(job.source)} | ${escapeCell(job.title)} | ${escapeCell(job.company)} | ${escapeCell(job.location)} | ${job.seniority} | ${job.timezoneFit} | ${job.score} | ${escapeCell(matched)} | [Apply](${job.url}) |`;
    })
    .join("\n");

  const failuresText = failures.length
    ? `\n## Source Warnings\n\n${failures.map((item) => `- ${item}`).join("\n")}\n`
    : "";

  return `# Remote Job Matches For Wai Phyo Oo

Generated: ${now}

Portfolio: https://nighteuleportfolio-site.vercel.app/

This report ranks remote jobs by match with Wai's current profile, with heavier weight on .NET, C#, ASP.NET Core, React, SQL, junior/mid software roles, and remote setups that are friendlier to Asia-based work.

## Summary

- Raw remote jobs fetched: ${jobs.length}
- Software-relevant roles after filtering: ${relevantCount}
- Roles matching target stack/title rules: ${targetFitCount}
- Strong matches shown below: ${strongCount}
- Review candidates shown below: ${reviewCount}

## Top Matches

| # | Source | Role | Company | Location | Level | TZ Fit | Score | Matched Signals | Link |
|---|---|---|---|---|---|---|---:|---|---|
${rows || "| - | - | No strong matches found today | - | - | - | - | - | - | - |"}

## Review Queue

These are not as clean a fit as the top list, but they still mention part of the stack and are worth a quick manual scan.

| # | Source | Role | Company | Location | Level | TZ Fit | Score | Matched Signals | Link |
|---|---|---|---|---|---|---|---:|---|---|
${reviewRows || "| - | - | No review candidates found today | - | - | - | - | - | - | - |"}

## How To Use

1. Open the highest-score jobs first.
2. Check location and timezone restrictions before applying.
3. Use the portfolio link in every application.
4. Prioritize junior/mid backend or full-stack roles using .NET, C#, ASP.NET Core, React, and SQL.
5. Be cautious with listings that are technically remote but locked to US/EU-only timezones.

## Manual Boards To Check

- Wellfound .NET remote jobs: https://wellfound.com/role/r/.net-developer
- Arc .NET remote jobs: https://arc.dev/remote-jobs/dot-net
- RemoteRocketship ASP.NET jobs: https://www.remoterocketship.com/jobs/asp-net/
- We Work Remotely software jobs: https://weworkremotely.com/remote-software-developer-jobs
${failuresText}`;
}

function toCsvValue(value) {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

function renderCsv(jobs) {
  const scoredJobs = toScoredJobs(jobs).filter(
    (job) => job.relevant && job.track !== "Weak" && (job.track === "Strong" || hasDesiredCoreSignals(job)),
  );
  const header = [
    "Track",
    "Source",
    "Role",
    "Company",
    "Location",
    "Level",
    "Timezone Fit",
    "Score",
    "Matched Signals",
    "Apply URL",
  ];

  const rows = scoredJobs.map((job) =>
    [
      job.track,
      job.source,
      job.title,
      job.company,
      job.location,
      job.seniority,
      job.timezoneFit,
      job.score,
      job.matched.join(", "),
      job.url,
    ]
      .map(toCsvValue)
      .join(","),
  );

  return [header.map(toCsvValue).join(","), ...rows].join("\n");
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const failures = [];
  const batches = await Promise.all(
    sources.map(async (source) => {
      try {
        return await fetchSource(source);
      } catch (error) {
        failures.push(`${source.name}: ${error.message}`);
        return [];
      }
    }),
  );

  const jobs = dedupeJobs(batches.flat());
  const report = renderReport(jobs, failures);
  const csv = renderCsv(jobs);
  const outputDir = path.join(process.cwd(), "jobs");
  const outputPath = path.join(outputDir, "remote-jobs.md");
  const csvPath = path.join(outputDir, "remote-jobs.csv");

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, report, "utf8");
  await writeFile(csvPath, csv, "utf8");

  const scoredJobs = toScoredJobs(jobs);
  const relevantCount = scoredJobs.filter((job) => job.relevant).length;
  const targetFitCount = scoredJobs.filter((job) => job.targetFit).length;
  const strongCount = scoredJobs.filter((job) => job.track === "Strong").length;
  const reviewCount = scoredJobs.filter(
    (job) =>
      job.relevant &&
      job.track === "Review" &&
      hasDesiredCoreSignals(job) &&
      !includesAny(normalize(job.title), profile.hardTitleExclusions),
  ).length;

  console.log(
    `Fetched ${jobs.length} raw remote jobs; ${relevantCount} software-relevant; ${targetFitCount} target-fit; ${strongCount} strong; ${reviewCount} review. Report written to ${outputPath} and ${csvPath}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
