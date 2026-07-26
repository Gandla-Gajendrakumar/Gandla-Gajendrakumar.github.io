import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://gandla-gajendrakumar.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gandla Gajendra Kumar | Lead Data Engineer & GenAI Builder",
  description:
    "Portfolio of Gandla Gajendra Kumar, a Lead Data Engineer and Generative AI builder specialising in enterprise data platforms, Business Intelligence, Databricks, Power BI, LLM applications, RAG systems and intelligent automation.",
  authors: [{ name: "Gandla Gajendra Kumar" }],
  keywords: [
    "Data Engineering",
    "Generative AI",
    "Business Intelligence",
    "Databricks",
    "Power BI",
    "LLM",
    "RAG",
    "Multi-agent systems",
    "Snowflake",
    "PySpark",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Gandla Gajendra Kumar | Lead Data Engineer & GenAI Builder",
    description:
      "Enterprise data platforms, BI modernisation, LLM applications, RAG systems and intelligent automation.",
    url: SITE_URL,
    siteName: "Gandla Gajendra Kumar",
    images: [{ url: "/images/social-preview.png", width: 1200, height: 630, alt: "Gandla Gajendra Kumar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gandla Gajendra Kumar | Lead Data Engineer & GenAI Builder",
    description:
      "Enterprise data platforms, BI modernisation, LLM applications, RAG systems and intelligent automation.",
    images: ["/images/social-preview.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gandla Gajendra Kumar",
  jobTitle: "Lead Data Engineer & Generative AI Builder",
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/gajendra-kumar-gandla",
    "https://github.com/Gandla-Gajendrakumar",
  ],
  knowsAbout: [
    "Data Engineering",
    "Business Intelligence",
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Databricks",
    "Power BI",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
