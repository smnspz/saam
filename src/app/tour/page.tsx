import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { formatDate } from "@/utils/dateUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

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
  const events = await fetch(
    `/api/events`,
    { next: { revalidate: 3600 } } // Revalidate cache every hour
  );
  const data: Event[] = await events.json();

  const buttonText = (event: Event): string => {
    if (event.offers[0].type === "Tickets") {
      return "tickets";
    }
    return "+ info";
  };

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

      <main className="min-w-screen h-screen bg-black/90 py-10">
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
            <article
              key={event.id}
              className="flex sm:flex-row sm:justify-between sm:items-center sm:gap-0 flex-col items-center gap-2 border-b py-2 px-4 mb-4 border-white/40"
            >
              <div className="flex flex-col items-center sm:items-start gap-0.5">
                <time dateTime={event.datetime} className="font-bold text-lg">
                  {formatDate(event.datetime)}
                </time>
                <div className="flex gap-2">
                  <h2>{event.title}</h2>
                  <span className="sm:hidden">/</span>
                  <address className="sm:hidden not-italic">
                    {event.venue.city}
                  </address>
                </div>
              </div>
              <address className="hidden sm:block not-italic">
                {event.venue.city}
              </address>
              <Link href={event.offers[0].url}>
                <Button
                  className="text-lg text-black flex gap-1 justify-center cursor-pointer mb-1 mt-2 sm:mt-0"
                  variant="outline"
                >
                  {buttonText(event)}
                  <ChevronRight />
                </Button>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
