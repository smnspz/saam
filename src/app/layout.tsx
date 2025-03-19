import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/providers/posthog";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saam.band"),
  title: {
    template: "%s | SAAM",
    default: "SAAM | Italian Emo Rock Band",
  },
  description: "Per ogni caduta una terra amata fuori ora!",
  generator: "Next.js",
  applicationName: "SAAM Website",
  referrer: "origin-when-cross-origin",
  keywords: [
    "SAAM",
    "Italian band",
    "emo rock",
    "music",
    "Per ogni caduta una terra amata",
  ],
  authors: [{ name: "SAAM" }],
  creator: "SAAM",
  publisher: "SAAM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={ibmPlexMono.className}>
      <PostHogProvider>
        <body className="antialiased font-ibm-plex-mono">{children}</body>
      </PostHogProvider>
    </html>
  );
}
