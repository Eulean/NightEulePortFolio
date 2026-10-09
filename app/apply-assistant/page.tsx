import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { getApplicationPacks } from "@/lib/application-assistant";

export const metadata: Metadata = {
  title: "Apply Assistant | Wai Phyo Oo",
  description:
    "Tailored application packs for current job matches, including email drafts, CV focus notes, and manual apply checklists.",
  robots: {
    index: false,
    follow: false,
  },
};

function toMailto(subject: string, body: string) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default async function ApplyAssistantPage() {
  const packs = await getApplicationPacks();
  const autoPrepare = packs.filter((pack) => pack.lane === "Auto-prepare");
  const manualApply = packs.filter((pack) => pack.lane === "Manual apply");

  return (
    <main className="portfolio-shell apply-shell" id="main-content">
      <SiteHeader current="apply" />

      <section className="apply-hero">
        <div>
          <p className="eyebrow">Apply Assistant</p>
          <h1>Tailored packs for faster job applications</h1>
          <p className="apply-intro">
            This page turns your current job matches into application-ready packs with a tailored
            email draft, CV focus notes, proof links, and a clear apply checklist.
          </p>
        </div>
        <aside className="signal-panel">
          <div>
            <p className="signal-label">Jobs loaded</p>
            <p className="signal-value">{packs.length}</p>
          </div>
          <div>
            <p className="signal-label">Auto-prepare</p>
            <p className="signal-value">{autoPrepare.length}</p>
          </div>
          <div>
            <p className="signal-label">Manual apply</p>
            <p className="signal-value">{manualApply.length}</p>
          </div>
        </aside>
      </section>

      <section className="content-section">
        <div className="apply-section-header">
          <div>
            <p className="eyebrow">Auto-prepare</p>
            <h2>Best-fit jobs with ready-to-send drafts</h2>
          </div>
          <p className="section-intro">
            These are the strongest matches. The system has already assembled a focused email and
            CV angle so you can move quickly.
          </p>
        </div>

        <div className="apply-grid">
          {autoPrepare.length ? (
            autoPrepare.map((pack) => (
              <article key={`${pack.job.source}-${pack.job.role}-${pack.job.company}`} className="apply-card">
                <div className="apply-card-top">
                  <div>
                    <p className="apply-lane">{pack.lane}</p>
                    <h3>{pack.job.role}</h3>
                    <p className="apply-meta">
                      {pack.job.company} · {pack.job.location} · Score {pack.job.score}
                    </p>
                  </div>
                  <div className="apply-actions">
                    <a className="button button-primary" href={pack.job.applyUrl} target="_blank" rel="noreferrer">
                      Open Job
                    </a>
                    <a className="button button-secondary" href={toMailto(pack.subject, pack.emailBody)}>
                      Open Email Draft
                    </a>
                  </div>
                </div>

                <div className="apply-panel-grid">
                  <section className="apply-panel">
                    <p className="apply-panel-label">Tailored email subject</p>
                    <p className="apply-inline-block">{pack.subject}</p>
                    <p className="apply-panel-label">Tailored email body</p>
                    <pre className="apply-code-block">{pack.emailBody}</pre>
                  </section>

                  <section className="apply-panel">
                    <p className="apply-panel-label">CV title</p>
                    <p className="apply-inline-block">{pack.cvTitle}</p>
                    <p className="apply-panel-label">CV summary</p>
                    <p className="apply-copy">{pack.cvSummary}</p>
                    <p className="apply-panel-label">CV focus bullets</p>
                    <ul className="apply-list">
                      {pack.cvBullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="apply-panel-grid">
                  <section className="apply-panel">
                    <p className="apply-panel-label">Best proof links</p>
                    <ul className="apply-link-list">
                      {pack.proofLinks.map((link) => (
                        <li key={`${pack.job.role}-${link.title}`}>
                          <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="apply-panel">
                    <p className="apply-panel-label">Apply checklist</p>
                    <ol className="apply-list apply-list-numbered">
                      {pack.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </section>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>No strong jobs loaded right now</h3>
              <p>Run the job finder again after refreshing sources to refill this lane.</p>
            </div>
          )}
        </div>
      </section>

      <section className="content-section">
        <div className="apply-section-header">
          <div>
            <p className="eyebrow">Manual apply</p>
            <h2>Good leads that still need more human judgment</h2>
          </div>
          <p className="section-intro">
            These jobs still get a draft pack, but you should read the posting carefully and decide
            whether the fit is worth your time before submitting.
          </p>
        </div>

        <div className="apply-grid">
          {manualApply.length ? (
            manualApply.map((pack) => (
              <article key={`${pack.job.source}-${pack.job.role}-${pack.job.company}`} className="apply-card apply-card-manual">
                <div className="apply-card-top">
                  <div>
                    <p className="apply-lane">{pack.lane}</p>
                    <h3>{pack.job.role}</h3>
                    <p className="apply-meta">
                      {pack.job.company} · {pack.job.location} · Score {pack.job.score}
                    </p>
                  </div>
                  <div className="apply-actions">
                    <a className="button button-primary" href={pack.job.applyUrl} target="_blank" rel="noreferrer">
                      Review Job
                    </a>
                    <a className="button button-secondary" href={toMailto(pack.subject, pack.emailBody)}>
                      Draft Email
                    </a>
                  </div>
                </div>

                <div className="apply-panel-grid">
                  <section className="apply-panel">
                    <p className="apply-panel-label">Why it might fit</p>
                    <p className="apply-inline-block">
                      {pack.job.matchedSignals.length
                        ? pack.job.matchedSignals.join(", ")
                        : "General software fit"}
                    </p>
                    <p className="apply-panel-label">Tailored email body</p>
                    <pre className="apply-code-block">{pack.emailBody}</pre>
                  </section>

                  <section className="apply-panel">
                    <p className="apply-panel-label">CV focus bullets</p>
                    <ul className="apply-list">
                      {pack.cvBullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <p className="apply-panel-label">Manual review checklist</p>
                    <ol className="apply-list apply-list-numbered">
                      {pack.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </section>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>No manual-review jobs loaded right now</h3>
              <p>The current CSV does not include review-lane jobs yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
