import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  capabilities,
  contactMeta,
  featuredProjects,
  pricingRows,
  proofStrip,
  services,
  stackGroups,
  timeline,
  workSteps,
} from "@/lib/portfolio-data";

export default function Home() {
  return (
    <main className="portfolio-shell" id="main-content">
      <SiteHeader current="home" />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Backend-focused full-stack developer · Yangon, Myanmar</p>
          <div className="hero-kicker-row">
            <span className="hero-kicker hero-kicker-strong">Available for remote roles</span>
            <span className="hero-kicker">Open for selected freelance projects</span>
          </div>
          <h1>Wai Phyo Oo</h1>
          <p className="hero-statement">
            Reliable software for real business workflows.
          </p>
          <p className="hero-support">
            I build .NET APIs, React interfaces, reporting systems, and internal tools that turn
            complex operations into software teams can trust and maintain.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              View Selected Work
            </a>
            <a href="/resume" className="button button-secondary">
              View Resume
            </a>
          </div>
          <p className="hero-client-link">
            Need a custom website or business system? <a href="#contact">Start a project</a>
          </p>
          <ul className="proof-strip" aria-label="Core proof strip">
            {proofStrip.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="signal-panel" aria-label="Professional snapshot">
          <div className="signal-panel-heading">
            <p>Professional snapshot</p>
            <span>Remote-ready</span>
          </div>
          <dl className="signal-list">
            <div>
              <dt>Core stack</dt>
              <dd>.NET 8 · ASP.NET Core · React · SQL</dd>
            </div>
            <div>
              <dt>Strongest work</dt>
              <dd>Business workflows, authentication, reporting, and exports</dd>
            </div>
            <div>
              <dt>Delivery range</dt>
              <dd>Backend APIs through polished admin and client interfaces</dd>
            </div>
            <div>
              <dt>Selected proof</dt>
              <dd>Enterprise trade systems, POS, document tools, and tested backends</dd>
            </div>
          </dl>
          <a href="/resume" className="text-link signal-link">
            Read full resume
          </a>
        </aside>
      </section>

      <section className="capability-band" id="about">
        {capabilities.map((item) => (
          <article key={item.label} className="capability-card">
            <p className="capability-label">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="content-section" id="work">
        <SectionHeading
          eyebrow="Featured work"
          title="Proof-first project storytelling"
          intro="The portfolio leads with real systems, shipped workflows, and practical engineering signals instead of generic self-description."
        />

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className={`project-card ${index === 0 ? "project-card-featured" : ""}`}
            >
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              <ul className="project-bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="project-stack">{project.stack}</p>
              <a href={project.href} className="text-link">
                {project.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section timeline-section">
        <SectionHeading
          eyebrow="Experience arc"
          title="A portfolio shaped by enterprise systems and practical builds"
        />

        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.year} className="timeline-item">
              <p className="timeline-year">{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="services">
        <SectionHeading
          eyebrow="Services"
          title="Freelance work that stays modern, fast, and maintainable"
          intro="Built for clients who need a site or system that looks credible, works cleanly, and stays easy to update after launch."
        />

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <p className="service-price">{service.price}</p>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <a href="#contact" className="text-link">
                Ask about this service
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section pricing-layout">
        <div className="pricing-panel">
          <SectionHeading
            eyebrow="Pricing preview"
            title="Clear starting points, flexible final scope"
            intro="Public pricing stays simple. Final cost depends on content, integrations, timeline, and the actual feature depth."
          />

          <div className="pricing-rows">
            {pricingRows.map((row) => (
              <div key={row.name} className="pricing-row">
                <div>
                  <h3>{row.name}</h3>
                  <p>{row.note}</p>
                </div>
                <p className="pricing-value">{row.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="How I work"
          title="Simple process, steady delivery"
        />

        <div className="steps-grid">
          {workSteps.map((step) => (
            <article key={step.number} className="step-card">
              <p className="step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section stack-layout">
        <SectionHeading eyebrow="Technical stack" title="Grouped for quick scanning" />

        <div className="stack-grid">
          {stackGroups.map(([label, value]) => (
            <article key={label} className="stack-card">
              <p className="stack-label">{label}</p>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section contact-layout" id="contact">
        <div className="contact-summary">
          <SectionHeading
            eyebrow="Resume and contact"
            title="Open to strong remote teams and solid freelance projects"
            intro="If you need a fast business site, e-commerce build, custom project, or a backend-focused product developer, the next step is simple."
          />

          <div className="contact-use-cases">
            <span>Freelance website work</span>
            <span>Custom project inquiries</span>
            <span>Remote job opportunities</span>
          </div>

          <div className="contact-meta">
            {contactMeta.map((item) => (
              <div key={item.label} className="contact-meta-row">
                <p>{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <div className="contact-actions">
            <a href="/resume" className="button button-primary">
              View Resume
            </a>
            <a href="/files/Wai_Phyo_Oo_Resume.pdf" download className="button button-secondary">
              Download Resume
            </a>
            <a href="https://github.com/Eulean" className="button button-secondary">
              Visit GitHub
            </a>
          </div>
        </div>

        <ContactForm />
      </section>

      <SiteFooter />
    </main>
  );
}
