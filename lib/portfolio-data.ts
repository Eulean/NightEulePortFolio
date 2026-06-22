export const proofStrip = [
  ".NET",
  "React",
  "SQL",
  "Go",
  "Enterprise systems",
  "Remote-ready",
];

export const capabilities = [
  {
    label: "Backend Systems",
    title: "Practical business logic and reliable APIs",
    body: "I build maintainable backend systems for reporting, workflows, authentication, and business operations.",
  },
  {
    label: "Workflow & Reporting",
    title: "Built for real internal processes",
    body: "My strongest work sits in approval flows, enterprise data handling, exports, document generation, and admin tooling.",
  },
  {
    label: "Full-Stack Delivery",
    title: "From data model to polished interface",
    body: "I can take projects from architecture and database design through frontend delivery, launch, and future iteration.",
  },
];

export const featuredProjects = [
  {
    title: "Restaurant POS System",
    type: "Public flagship project",
    summary:
      "A complete restaurant point-of-sale platform with orders, kitchen flow, inventory, payments, receipts, reporting, and production-minded operations support.",
    bullets: [
      "Built with .NET 8, SQLite, React, and Vite.",
      "Includes auth, role-based access, inventory, PDF receipts, and reporting.",
      "Backups, restore workflows, deployment notes, and health checks are already part of the project.",
    ],
    stack: ".NET 8, ASP.NET Core, React, Vite, SQLite, QuestPDF, ClosedXML",
    cta: "View public project",
    href: "https://github.com/Eulean/POSFORRESTURANT",
  },
  {
    title: "Enterprise E-Commerce / DOCA / DOCCA Systems",
    type: "Private enterprise work",
    summary:
      "Feature delivery and maintenance across business registration, reporting, approvals, appeal workflows, and admin/client interfaces.",
    bullets: [
      "Implemented OTP login, role-based authorization, and user validation flows.",
      "Built filtered reports, payment reporting, appeal flows, and export features.",
      "Fixed production workflow issues in data, search, and UI behavior.",
    ],
    stack: "ASP.NET Core, EF Core, React, TypeScript, Ant Design, SQL Server",
    cta: "Discuss similar work",
    href: "#contact",
  },
  {
    title: "Tradenet Member Management",
    type: "Private enterprise work",
    summary:
      "Targeted contribution to Tradenet 2.0 oversea member-management flows, including editing, validation, and activation controls.",
    bullets: [
      "Built sub-member edit, email edit, password edit, and activation workflows.",
      "Worked through MVC controllers, Razor views, repository HTTP calls, and AJAX forms.",
      "Added user-management safeguards including active-member limits.",
    ],
    stack: "ASP.NET MVC, Razor, jQuery, DataTables, SweetAlert",
    cta: "See enterprise focus",
    href: "#contact",
  },
  {
    title: "BDMS and Tested Backend Work",
    type: "Organization backend project",
    summary:
      "A structured .NET backend with domain modeling, service boundaries, and automated test coverage around healthcare-style workflows.",
    bullets: [
      "Local verification showed 80 passing tests.",
      "Strong signal for backend workflow design and test discipline.",
    ],
    stack: ".NET 8, SQL Server, Docker, xUnit, Moq, MediatR",
    cta: "Explore backend profile",
    href: "https://github.com/one-project-one-month/BDMS_CSharp",
  },
  {
    title: "Safety Data Sheet and PDF Generation",
    type: "Public supporting project",
    summary:
      "Document-heavy application work focused on structured data, business reporting, and export workflows.",
    bullets: [
      "Built with ASP.NET Core MVC, Razor, EF Core, and SQL Server.",
      "Shows strong fit for document, reporting, and information systems.",
    ],
    stack: "ASP.NET Core MVC, Razor, EF Core, SQL Server, PuppeteerSharp",
    cta: "View public project",
    href: "https://github.com/Eulean/SafetyDataSheet",
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Tradenet workflow contribution",
    body: "Contributed to private enterprise member-management flows in Tradenet 2.0 oversea, focusing on sub-member operations and validation.",
  },
  {
    year: "2025",
    title: "Enterprise systems and reporting work",
    body: "Delivered features across Shwe-Digits systems including OTP auth, reporting, approval workflows, exports, UI fixes, and business data flows.",
  },
  {
    year: "2026",
    title: "Public proof and freelance-ready positioning",
    body: "Sharpened public-facing work with POS, Go backend practice, resume assets, and a portfolio built to support both remote roles and freelance projects.",
  },
];

export const services = [
  {
    title: "Fast Business Website",
    price: "Starting from Ks 600,000",
    body: "For company profiles, service businesses, portfolios, and landing pages that need to look credible, load fast, and be easy to maintain.",
  },
  {
    title: "E-commerce Website",
    price: "Starting from Ks 1,800,000",
    body: "For online sellers who need products, categories, checkout, order flow, and a cleaner storefront than a basic template build.",
  },
  {
    title: "Custom Project Build",
    price: "Starting from Ks 2,500,000",
    body: "For dashboards, internal tools, workflow platforms, booking systems, or business-specific features that need custom logic.",
  },
  {
    title: "Maintenance / Improvements",
    price: "Starting from Ks 250,000 / month",
    body: "For bug fixes, performance improvements, content updates, and steady monthly support after launch.",
  },
];

export const pricingRows = [
  {
    name: "Fast Business Website",
    price: "Ks 600,000+",
    note: "Responsive company website with core pages, contact flow, and launch support.",
  },
  {
    name: "E-commerce Website",
    price: "Ks 1,800,000+",
    note: "Product catalog, shop flow, and a stronger foundation for online selling.",
  },
  {
    name: "Custom Project Build",
    price: "Ks 2,500,000+ / Custom Quote",
    note: "Best for business-specific functionality, internal tools, and workflow-heavy products.",
  },
  {
    name: "Monthly Support",
    price: "Ks 250,000+ / month",
    note: "Ongoing updates, fixes, improvements, and practical post-launch support.",
  },
];

export const workSteps = [
  {
    number: "01",
    title: "Understand the project",
    body: "We start with the real business goal, the scope, and what success should actually look like.",
  },
  {
    number: "02",
    title: "Build the right scope",
    body: "I shape the project around speed, maintainability, and the features that matter most first.",
  },
  {
    number: "03",
    title: "Launch and improve",
    body: "After launch, we can keep improving through updates, fixes, or longer-term support.",
  },
];

export const stackGroups = [
  ["Languages", "C#, TypeScript, JavaScript, Go, SQL"],
  ["Backend", ".NET 8, ASP.NET Core, ASP.NET MVC, EF Core, REST APIs"],
  ["Frontend", "React, Vite, Tailwind CSS, Ant Design, Razor, jQuery"],
  ["Databases", "SQL Server, PostgreSQL, SQLite, Redis basics"],
  ["Reporting", "Excel export, PDF generation, business reporting, admin workflows"],
  ["Delivery", "Docker basics, GitHub Actions, IIS deployment, backups, health checks"],
] as const;

export const contactMeta = [
  { label: "Email", value: "eulen9t5@gmail.com" },
  { label: "Telegram", value: "@nighteule39" },
  { label: "GitHub", value: "github.com/Eulean" },
  { label: "Availability", value: "Remote roles and freelance web projects" },
];

export const contactFormOptions = {
  projectTypes: [
    "Business website",
    "E-commerce website",
    "Custom web project",
    "Maintenance / improvements",
    "Job opportunity",
  ],
  budgetRanges: [
    "Under Ks 600,000",
    "Ks 600,000 - 1,800,000",
    "Ks 1,800,000 - 2,500,000",
    "Ks 2,500,000+",
    "Need custom quote",
  ],
};
