import { ThemeToggle } from "@/components/theme-toggle";

type SiteHeaderProps = {
  current?: "home" | "resume" | "apply";
};

export function SiteHeader({ current = "home" }: SiteHeaderProps) {
  const isInternalTool = current === "apply";

  return (
    <header className="site-nav">
      <a href={current === "home" ? "#top" : "/"} className="brand" aria-label="NightEule home">
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
        <nav aria-label={isInternalTool ? "Application assistant" : "Primary navigation"}>
          {isInternalTool ? (
            <>
              <a href="/">Portfolio</a>
              <a href="/resume">Resume</a>
              <a href="/#contact">Contact</a>
            </>
          ) : (
            <>
              <a href="/#work">Work</a>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <a href="/resume" aria-current={current === "resume" ? "page" : undefined}>
                Resume
              </a>
              <a href="/#contact">Contact</a>
            </>
          )}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
