import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const themeScript = `
(() => {
  const key = "portfolio-theme";
  const saved = window.localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
})();
`;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Wai Phyo Oo | Backend-Focused Full-Stack Developer",
  description:
    "Portfolio for Wai Phyo Oo, a backend-focused full-stack developer building enterprise workflows, reporting systems, modern business websites, and practical software.",
  metadataBase: new URL("https://nighteuleportfolio-site.vercel.app"),
  applicationName: "NightEule Portfolio",
  icons: {
    icon: "/brand/night-eule-mark.svg",
    shortcut: "/brand/night-eule-mark.svg",
    apple: "/brand/night-eule-mark.svg",
  },
  keywords: [
    "Wai Phyo Oo",
    "backend developer",
    "full-stack developer",
    ".NET developer",
    "React developer",
    "Myanmar developer",
    "freelance web developer",
    "portfolio",
  ],
  openGraph: {
    title: "Wai Phyo Oo | Backend-Focused Full-Stack Developer",
    description:
      "Enterprise workflows, reporting systems, fast business websites, and practical full-stack software delivery.",
    url: "https://nighteuleportfolio-site.vercel.app",
    siteName: "Wai Phyo Oo Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wai Phyo Oo | Backend-Focused Full-Stack Developer",
    description:
      "Enterprise workflows, reporting systems, fast business websites, and practical full-stack software delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.variable} ${sourceSerif.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
