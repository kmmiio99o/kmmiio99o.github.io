import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimationProvider } from "@/components/AnimationProvider";
import { Layout } from "@/components/Layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kmmiio99o - Full-Stack Developer",
  description:
    "Full-Stack Developer & Tech Enthusiast. I build modern web applications with cutting-edge technologies.",
  keywords:
    "developer, full-stack, web development, TypeScript, React, Next.js, Node.js",
  authors: [{ name: "kmmiio99o" }],
  creator: "kmmiio99o",
  publisher: "kmmiio99o",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kmmiio99o.github.io",
    title: "kmmiio99o - Full-Stack Developer",
    description:
      "Full-Stack Developer & Tech Enthusiast. I build modern web applications with cutting-edge technologies.",
    siteName: "kmmiio99o Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "kmmiio99o - Full-Stack Developer",
    description:
      "Full-Stack Developer & Tech Enthusiast. I build modern web applications with cutting-edge technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="theme-color" content="#6750A4" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AnimationProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
