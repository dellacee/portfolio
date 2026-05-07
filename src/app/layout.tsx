import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RESUME } from "@/data/resume";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(RESUME.url),
  title: {
    default: `${RESUME.name} — ${RESUME.role}`,
    template: `%s · ${RESUME.name}`,
  },
  description: RESUME.tagline,
  keywords: [
    RESUME.name,
    RESUME.role,
    "Full-stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "ASP.NET Core",
    "Node.js",
    "Vietnam",
    "Portfolio",
  ],
  authors: [{ name: RESUME.name, url: RESUME.url }],
  creator: RESUME.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: RESUME.url,
    siteName: `${RESUME.name} · Portfolio`,
    title: `${RESUME.name} — ${RESUME.role}`,
    description: RESUME.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME.name} — ${RESUME.role}`,
    description: RESUME.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
