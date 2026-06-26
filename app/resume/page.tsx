import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Resume | Wai Phyo Oo",
  description:
    "Resume for Wai Phyo Oo, a backend-focused full-stack developer working with .NET, React, SQL, Go, enterprise workflows, and reporting systems.",
};

const coreSkills = [
  "C# / .NET 8 / ASP.NET Core",
  "React / TypeScript / JavaScript",
  "SQL Server / PostgreSQL / SQLite",
  "Entity Framework Core / REST APIs",
  "JWT / RBAC / OTP authentication",
  "Excel export / PDF generation / reporting",
  "Docker basics / GitHub Actions / IIS deployment",
];

const experience = [
  {
    role: "Full-Stack Developer / Enterprise Systems Contributor",
    org: "Shwe-Digits organization projects",
    summary:
      "Contributed to enterprise e-commerce, trade registration, customs/reporting, DOCA/DOCCA, and Tradenet-related systems.",
    bullets: [
      "Built backend and frontend features across ASP.NET Core APIs, ASP.NET MVC/Razor, React/TypeScript admin portals, and reporting interfaces.",
      "Implemented OTP login flows, user activation checks, role-based access control, filtered reports, Excel exports, approval/rejection workflows, appeal flows, and payment reports.",
      "Contributed to Tradenet 2.0 oversea member-management workflows including sub-member edit, email edit, password edit, activation/deactivation, and validation rules.",
    ],
    stack:
      "C#, ASP.NET Core, ASP.NET MVC, EF Core, SQL Server, React, TypeScript, Ant Design, Razor, jQuery, DataTables, ExcelJS",
  },
  {
    role: "Backend / Full-Stack Project Contributor",
    org: "one-project-one-month organization projects",
    summary:
      "Built backend features for LMS, online job finder, and structured .NET backend systems.",
    bullets: [
      "Implemented JWT authentication, token refresh, role claims, registration/login endpoints, BCrypt password hashing, and validation flows.",
      "Built recruiter/company profile services, job management models, application workflows, status updates, and company review features.",
      "Worked with service layers, DTOs, EF Core models, authenticated user claims, and domain workflows.",
    ],
    stack: "C#, ASP.NET Core, Entity Framework Core, JWT, BCrypt, FluentValidation, SQL Server, Swagger",
  },
];

const projects = [
  {
    name: "Restaurant POS System",
    description:
      "Full-stack restaurant point-of-sale system with orders, kitchen workflow, payments, inventory, receipts, reporting, backup/restore, and deployment support.",
    stack: ".NET 8, ASP.NET Core, SQLite, EF Core, React, Vite, QuestPDF, ClosedXML",
  },
  {
    name: "Tradenet 2.0 Oversea Member Management",
    description:
      "Private enterprise trade-system contribution focused on sub-member account editing, email/password edits, activation/deactivation, UI validation, and MVC/Razor workflows.",
    stack: "ASP.NET MVC, C#, Razor, jQuery, DataTables, SweetAlert, REST integration",
  },
  {
    name: "Safety Data Sheet / PDF Generation",
    description:
      "Document-heavy ASP.NET Core MVC/Razor work for structured safety data sheet information and PDF generation workflows.",
    stack: "ASP.NET Core MVC, Razor, EF Core, SQL Server, PuppeteerSharp",
  },
  {
    name: "Go Backend Practice",
    description:
      "Backend API practice with authentication-oriented structure, handlers, services, repositories, PostgreSQL, JWT, rate limiting, and Docker support.",
    stack: "Go, Gin, PostgreSQL, JWT, Docker",
  },
];

export default function ResumePage() {
  return (
    <main className="portfolio-shell resume-shell">
      <header className="site-nav">
        <a href="/" className="brand" aria-label="NightEule home">
          <img
            src="/brand/night-eule-wordmark.svg"
            alt=""
            className="brand-logo brand-logo-light"
            width="1028"
            height="280"
          />
          <img
            src="/brand/night-eule-wordmark-dark.svg"
            alt=""
            aria-hidden="true"
            className="brand-logo brand-logo-dark"
            width="1028"
            height="280"
          />
        </a>
        <div className="nav-actions">
          <nav>
            <a href="/#work">Work</a>
            <a href="/#services">Services</a>
            <a href="/#about">About</a>
            <a href="/resume">Resume</a>
            <a href="/#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className="resume-hero">
        <div>
          <p className="eyebrow">Resume</p>
          <h1>Wai Phyo Oo</h1>
          <p className="resume-title">Backend-Focused Full-Stack Developer</p>
          <p className="resume-summary">
            I build practical business systems with .NET, React, SQL databases, and Go,
            with strong experience in enterprise workflows, reporting, authentication,
            PDF/Excel exports, and full-stack delivery.
          </p>
        </div>
        <aside className="resume-contact-card">
          <p>Yangon, Myanmar</p>
          <p>
            <a href="mailto:eulen9t5@gmail.com">eulen9t5@gmail.com</a>
          </p>
          <p>
            <a href="https://github.com/Eulean">github.com/Eulean</a>
          </p>
          <p>Telegram: @nighteule39</p>
          <div className="resume-actions">
            <a
              href="/files/Wai_Phyo_Oo_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
            >
              Open PDF
            </a>
            <a
              href="/files/Wai_Phyo_Oo_Resume.pdf"
              download
              className="button button-primary"
            >
              Download PDF
            </a>
          </div>
        </aside>
      </section>

      <section className="resume-section">
        <h2>Core Skills</h2>
        <div className="resume-skill-grid">
          {coreSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        <div className="resume-list">
          {experience.map((item) => (
            <article key={item.role} className="resume-item">
              <p className="resume-item-meta">{item.org}</p>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="resume-stack">{item.stack}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Selected Projects</h2>
        <div className="resume-project-grid">
          {projects.map((project) => (
            <article key={project.name} className="resume-item">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="resume-stack">{project.stack}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section resume-two-column">
        <article>
          <h2>Education</h2>
          <ul>
            <li>Bachelor of Science in Botany</li>
            <li>Computer Science coursework, University of the People - currently attending</li>
            <li>Java Development Course Bootcamp (JDC), Myanmar</li>
          </ul>
        </article>
        <article>
          <h2>Availability</h2>
          <p>
            Available for remote full-time, part-time, freelance, or contract software
            development roles.
          </p>
        </article>
      </section>
    </main>
  );
}
