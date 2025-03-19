import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { formatDate } from "@/utils/dateUtils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TourDate({ event }: { event: Event }) {
  const buttonText = (event: Event): string => {
    if (event.offers[0].type === "Tickets") {
      return "tickets";
    }
    return "+ info";
  };

  return (
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
          <address className="sm:hidden not-italic">{event.venue.city}</address>
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
  );
}
