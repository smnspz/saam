// import { SpinningText } from "@/components/magicui/spinning-text";
import Logo from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { formatDate } from "@/utils/dateUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAAM - Tour",
  description: "Scopri dove e quando suoniamo",
};

export default async function Tour() {
  const events = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/events`
  );
  const data: Event[] = await events.json();

  const buttonText = (event: Event): string => {
    if (event.offers[0].type === "Tickets") {
      return "tickets";
    }
    return "+ info";
  };

  return (
    <main className="min-w-screen h-screen bg-black/90 py-10">
      <div className="text-white">
        {/* <SpinningText className="text-white" radius={9}>
          - forse siamo in tour, boh
        </SpinningText> */}
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
                className="text-lg text-black flex gap-1 justify-center items-center cursor-pointer mb-1 mt-2 sm:mt-0"
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
  );
}
