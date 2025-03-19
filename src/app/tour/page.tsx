import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import TourDate from "./components/tour-date";

export const metadata: Metadata = {
  title: "SAAM Tour Dates | Live Shows and Concerts",
  description:
    "Scopri dove e quando suoniamo. View all upcoming SAAM concerts, live shows, and tour dates in Italy and beyond.",
  keywords: [
    "SAAM",
    "live music",
    "concerts",
    "tour dates",
    "live shows",
    "Italian band",
    "Genova",
    "Liguria",
    "Milano",
    "Emo",
    "Rock",
    "Punk",
    "Pop Punk",
    "Indie",
  ],
  openGraph: {
    title: "SAAM Tour Dates | Live Shows and Concerts",
    description:
      "View all upcoming SAAM concerts, live shows, and tour dates in Italy and beyond.",
    url: "https://saam.band/tour",
    siteName: "SAAM Official Website",
    // images: [
    //   {
    //     url: "https://saam.band/images/saam-live.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "SAAM performing live",
    //   },
    // ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAM Tour Dates | Live Shows and Concerts",
    description:
      "View all upcoming SAAM concerts, live shows, and tour dates in Italy and beyond.",
    // images: ["https://saam.band/images/saam-live.jpg"], // Replace with actual image path
  },
  alternates: {
    canonical: "https://saam.band/tour",
  },
};

export default async function Tour() {
  const apiKey = process.env.BANDSINTOWN_API_KEY;
  const apiUrl = process.env.BANDSINTOWN_API_URL;
  const artistID = 15581473;

  const url = `${apiUrl}/id_${encodeURIComponent(
    artistID
  )}/events/?app_id=${apiKey}`;
  const events = await fetch(url);

  const data: Event[] = await events.json();


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "SAAM",
    url: "https://saam.band",
    event: data.map((event) => ({
      "@type": "MusicEvent",
      name: event.title,
      startDate: event.datetime,
      location: {
        "@type": "Place",
        name: event.venue.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: event.venue.city,
          addressCountry: event.venue.country,
        },
      },
      offers: {
        "@type": "Offer",
        url: event.offers[0].url,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-w-screen min-h-screen bg-black/90 py-10">
        <div className="text-white">
          <Link href="/">
            <Logo className="w-35 mx-auto" />
          </Link>
        </div>
        <section className="z-10 max-w-5xl mx-auto  rounded-lg p-10 text-white">
          <Link href="/">
            <Button variant="link" className="hidden sm:flex text-white mb-1">
              <ChevronLeft />
              Torna alla home
            </Button>
          </Link>
          {data.map((event: Event) => (
            <TourDate key={event.id} event={event} />
          ))}
        </section>
      </main>
    </>
  );
}
