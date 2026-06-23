import { mkdir, writeFile } from "node:fs/promises";
import https from "node:https";
import path from "node:path";

const profile = {
  preferredRemote: ["remote", "worldwide", "anywhere", "asia", "emea", "global"],
  strongSkills: [
    ".net",
    "dotnet",
    "c#",
    "asp.net",
    "asp.net core",
    "entity framework",
    "ef core",
    "sql",
    "sql server",
    "react",
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
  avoidIfOnly: ["ruby", "rails", "php", "wordpress", "ios", "android", "blockchain"],
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
  let score = 0;
  const matched = [];

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

  if (includesAny(haystack, ["junior", "mid", "intermediate", "associate"])) {
    score += 7;
  }

  if (includesAny(haystack, ["senior", "lead", "principal", "staff"])) {
    score -= 4;
  }

  if (includesAny(haystack, profile.preferredRemote)) {
    score += 5;
  }

  if (includesAny(haystack, profile.avoidIfOnly) && matched.length < 2) {
    score -= 10;
  }

  const relevant = isSoftwareRole(job, matched);

  if (!relevant) {
    score -= 25;
  }

  return {
    ...job,
    score,
    relevant,
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
  const topJobs = jobs
    .map(scoreJob)
    .filter((job) => job.relevant && job.score >= 16)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);

  const rows = topJobs
    .map((job, index) => {
      const matched = job.matched.length ? job.matched.join(", ") : "remote/general";
      return [
        `| ${index + 1} | ${escapeCell(job.title)} | ${escapeCell(job.company)} | ${escapeCell(job.location)} | ${job.score} | ${escapeCell(matched)} | [Apply](${job.url}) |`,
      ].join("\n");
    })
    .join("\n");

  const failuresText = failures.length
    ? `\n## Source Warnings\n\n${failures.map((item) => `- ${item}`).join("\n")}\n`
    : "";

  return `# Remote Job Matches For Wai Phyo Oo

Generated: ${now}

Portfolio: https://nighteuleportfolio-site.vercel.app/

This report ranks remote jobs by match with Wai's current profile: .NET, ASP.NET Core, React, TypeScript, SQL, backend APIs, enterprise workflows, reporting, PDF/Excel exports, and practical full-stack delivery.

## Top Matches

| # | Role | Company | Location | Score | Matched Signals | Link |
|---|---|---|---|---:|---|---|
${rows || "| - | No strong matches found today | - | - | - | - | - |"}

## How To Use

1. Open the highest-score jobs first.
2. Check location and timezone restrictions before applying.
3. Use the portfolio link in every application.
4. Prioritize junior, mid-level, backend, full-stack, .NET, React, SQL, and business-system roles.

## Manual Boards To Check

- Wellfound .NET remote jobs: https://wellfound.com/role/r/.net-developer
- Arc .NET remote jobs: https://arc.dev/remote-jobs/dot-net
- RemoteRocketship ASP.NET jobs: https://www.remoterocketship.com/jobs/asp-net/
- We Work Remotely software jobs: https://weworkremotely.com/remote-software-developer-jobs
${failuresText}`;
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
  const outputDir = path.join(process.cwd(), "jobs");
  const outputPath = path.join(outputDir, "remote-jobs.md");

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, report, "utf8");

  console.log(`Found ${jobs.length} remote jobs. Report written to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
