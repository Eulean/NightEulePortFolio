"use client";

import { useEffect, useState } from "react";

const storageKey = "portfolio-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const currentTheme = document.documentElement.dataset.theme;

  if (currentTheme === "light" || currentTheme === "dark") {
    return currentTheme;
  }

  const savedTheme = window.localStorage.getItem(storageKey);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    }

    return "light";
  });

  useEffect(() => {
    const nextTheme = getPreferredTheme();
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
