import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subham Panja | Portfolio OS - Interactive Developer Experience",
  description:
    "Experience Subham Panja's professional journey through Portfolio OS - an interactive, macOS-inspired web portfolio. Explore projects, skills, and experience in a unique desktop environment.",
  keywords: [
    "Portfolio OS",
    "Mac OS Portfolio",
    "Interactive Portfolio",
    "Web OS",
    "Subham Panja",
    "Senior Software Engineer",
    "Engineering Leader",
    "React OS",
    "System Design",
    "Full Stack Developer",
    "Python Developer",
    "FastAPI",
    "Django",
    "Next.js",
    "Cloud Native",
  ],
  authors: [{ name: "Subham Panja" }],
  openGraph: {
    title: "Subham Panja | Portfolio OS",
    description:
      "An interactive, macOS-inspired portfolio showcasing the work of Subham Panja, Senior Software Engineer & Engineering Leader.",
    url: "https://subhampanja.com",
    siteName: "Subham Panja Portfolio OS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subham Panja Portfolio OS Desktop Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subham Panja | Portfolio OS",
    description:
      "Explore my engineering journey through an interactive Portfolio OS.",
    creator: "@subham_panja",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Subham Panja",
    jobTitle: "Senior Software Engineer & Engineering Leader",
    url: "https://subhampanja.com",
    sameAs: [
      "https://linkedin.com/in/subhampanja",
      "https://github.com/subham-panja",
    ],
    description:
      "Senior Software Engineer & Engineering Leader specialized in building scalable, AI-powered applications.",
    knowsAbout: [
      "Python",
      "System Design",
      "Cloud Architecture",
      "Full Stack Development",
      "AI/ML",
      "Team Leadership",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
