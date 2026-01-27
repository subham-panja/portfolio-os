import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subham Panja | Senior Software Engineer & Technical Lead",
  description:
    "Results-driven Engineering Leader with 5+ years of experience building scalable, AI-powered applications. Expert in Python, Full-Stack Development, and Cloud-Native Architectures.",
  keywords: [
    "Subham Panja",
    "Senior Software Engineer",
    "Technical Lead",
    "Full Stack Developer",
    "Python Developer",
    "React Developer",
    "AI Engineer",
    "Cloud Architect",
  ],
  authors: [{ name: "Subham Panja" }],
  openGraph: {
    title: "Subham Panja | Senior Software Engineer",
    description:
      "Engineering Leader building scalable, AI-powered applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subham Panja | Senior Software Engineer",
    description:
      "Engineering Leader building scalable, AI-powered applications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
