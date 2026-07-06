import { readFile } from "node:fs/promises";
import path from "node:path";
import { featuredProjects } from "@/lib/portfolio-data";

export type ApplicationJob = {
  track: string;
  source: string;
  role: string;
  company: string;
  location: string;
  level: string;
  timezoneFit: string;
  score: number;
  matchedSignals: string[];
  applyUrl: string;
};

export type ApplicationPack = {
  job: ApplicationJob;
  lane: "Auto-prepare" | "Manual apply";
  subject: string;
  emailBody: string;
  cvTitle: string;
  cvSummary: string;
  cvBullets: string[];
  proofLinks: Array<{ title: string; href: string }>;
  checklist: string[];
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function normalize(value: string) {
  return value.toLowerCase();
}

function hasSignal(job: ApplicationJob, ...signals: string[]) {
  return signals.some((signal) => job.matchedSignals.includes(signal));
}

function hasText(job: ApplicationJob, ...terms: string[]) {
  const haystack = normalize(
    [job.role, job.company, job.location, job.level, job.timezoneFit, ...job.matchedSignals].join(" "),
  );
  return terms.some((term) => haystack.includes(term.toLowerCase()));
}

function getLane(job: ApplicationJob): "Auto-prepare" | "Manual apply" {
  if (job.track === "Strong") {
    return "Auto-prepare";
  }

  if (job.source.includes("JobNet")) {
    return "Manual apply";
  }

  return "Manual apply";
}

function getCvTitle(job: ApplicationJob) {
  if (hasSignal(job, ".net", "c#", "asp.net", "asp.net core", "asp net core")) {
    return "Backend-Focused Full-Stack Developer (.NET / C# / React / SQL)";
  }

  if (hasSignal(job, "react", "typescript", "javascript")) {
    return "Full-Stack Developer (React / TypeScript / Backend Workflows)";
  }

  return "Backend-Focused Full-Stack Developer";
}

function getCvSummary(job: ApplicationJob) {
  if (hasSignal(job, ".net", "c#")) {
    return "Built practical business applications with ASP.NET Core, C#, SQL-backed workflows, React frontends, reporting, and production-minded delivery.";
  }

  if (hasSignal(job, "react", "typescript")) {
    return "Built React and TypeScript interfaces backed by real business workflows, enterprise APIs, reporting features, and maintainable delivery habits.";
  }

  return "Built practical business software across backend APIs, database workflows, frontend delivery, reporting, and remote-ready product work.";
}

function getCvBullets(job: ApplicationJob) {
  const bullets: string[] = [];

  if (hasSignal(job, ".net", "c#", "asp.net", "asp.net core", "asp net core")) {
    bullets.push("Built full-stack business applications using ASP.NET Core, EF Core, C#, SQL databases, authentication flows, and production-style API structure.");
    bullets.push("Delivered enterprise workflow features including approvals, reporting, account validation, role-based access, and export-heavy admin systems.");
  }

  if (hasSignal(job, "react", "typescript", "javascript")) {
    bullets.push("Built React and TypeScript admin/client interfaces for data-heavy workflows, forms, dashboards, and practical business operations.");
  }

  if (hasSignal(job, "sql", "sql server", "postgresql", "sqlite", "reporting")) {
    bullets.push("Strong fit for data-backed features, filtered reporting, Excel/PDF export flows, and database-driven business logic.");
  }

  if (hasSignal(job, "backend", "api", "rest", "full stack", "full-stack")) {
    bullets.push("Comfortable owning backend-to-frontend delivery, including APIs, database-backed workflows, and maintainable implementation across the stack.");
  }

  if (hasText(job, "myanmar", "anywhere", "remote", "apac", "asia")) {
    bullets.push("Available for remote collaboration and comfortable working asynchronously across Asia-friendly timezones.");
  }

  return bullets.slice(0, 5);
}

function getProofLinks(job: ApplicationJob) {
  const picks = [];

  if (hasSignal(job, ".net", "c#", "asp.net", "asp.net core", "asp net core", "sql", "sql server")) {
    picks.push(featuredProjects[0], featuredProjects[1], featuredProjects[3]);
  } else if (hasSignal(job, "react", "typescript", "javascript")) {
    picks.push(featuredProjects[0], featuredProjects[1], featuredProjects[4]);
  } else {
    picks.push(featuredProjects[0], featuredProjects[2], featuredProjects[4]);
  }

  return picks.map((project) => ({ title: project.title, href: project.href }));
}

function getChecklist(job: ApplicationJob) {
  const checklist = [
    "Open the job post and confirm location, timezone, and work authorization requirements.",
    "Use the tailored email draft as the base message or cover note.",
    "Update the top CV summary and bullet order to match the role focus.",
    "Submit with portfolio and GitHub links included.",
  ];

  if (job.source.includes("JobNet")) {
    checklist.unshift("Log in to the Myanmar job portal and complete the required profile fields before applying.");
  }

  if (job.source.includes("We Work Remotely") || job.source.includes("Jobicy")) {
    checklist.unshift("Check whether the board redirects to a company ATS page or accepts a direct application.");
  }

  return checklist;
}

function getEmailBody(
  job: ApplicationJob,
  lane: "Auto-prepare" | "Manual apply",
  cvSummary: string,
  cvBullets: string[],
) {
  const intro =
    lane === "Auto-prepare"
      ? `Hello ${job.company} team,\n\nI’m applying for the ${job.role} role.`
      : `Hello ${job.company} team,\n\nI’d like to apply for the ${job.role} role and wanted to share a short introduction.`;

  const fit = [
    cvSummary,
    ...cvBullets.slice(0, 3).map((bullet) => `- ${bullet}`),
  ].join("\n");

  return `${intro}\n\nI believe my background fits this role well:\n${fit}\n\nPortfolio: https://nighteuleportfolio-site.vercel.app/\nGitHub: https://github.com/Eulean\nResume: https://nighteuleportfolio-site.vercel.app/files/Wai_Phyo_Oo_Resume.pdf\n\nThank you for your time. I’d be glad to discuss the role further.\n\nBest regards,\nWai Phyo Oo`;
}

function toApplicationPack(job: ApplicationJob): ApplicationPack {
  const lane = getLane(job);
  const cvTitle = getCvTitle(job);
  const cvSummary = getCvSummary(job);
  const cvBullets = getCvBullets(job);
  const proofLinks = getProofLinks(job);
  const checklist = getChecklist(job);
  const subject = `Application for ${job.role} - Wai Phyo Oo`;

  return {
    job,
    lane,
    subject,
    emailBody: getEmailBody(job, lane, cvSummary, cvBullets),
    cvTitle,
    cvSummary,
    cvBullets,
    proofLinks,
    checklist,
  };
}

export async function getApplicationPacks() {
  const csvPath = path.join(process.cwd(), "jobs", "remote-jobs.csv");
  const raw = await readFile(csvPath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const rows = lines.slice(1).map((line) => {
    const [
      track,
      source,
      role,
      company,
      location,
      level,
      timezoneFit,
      score,
      matchedSignals,
      applyUrl,
    ] = parseCsvLine(line);

    const job: ApplicationJob = {
      track,
      source,
      role,
      company,
      location,
      level,
      timezoneFit,
      score: Number(score) || 0,
      matchedSignals: matchedSignals
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      applyUrl,
    };

    return toApplicationPack(job);
  });

  return rows;
}
