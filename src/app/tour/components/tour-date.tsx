"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { formatDate } from "@/lib/utils/dateUtils";
import { ChevronRight, Copy, Ellipsis, Eye } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/lib/utils";

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
      className="flex sm:flex-row sm:justify-between sm:items-center sm:gap-0 flex-col items-center gap-2 border-b pb-2 px-4 mb-4 border-white/40"
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
      <address className="hidden sm:block not-italic mx-auto">
        {event.venue.city}
      </address>
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 sm:mb-2 mt-2 sm:mt-0">
        <Link href={event.offers[0].url} target="_blank">
          <Button
            className="text-lg text-black flex gap-1 justify-center cursor-pointer "
            variant="outline"
          >
            {buttonText(event)}
            <ChevronRight />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="text-white cursor-pointer sm:rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={event.url} target="_blank">
              <DropdownMenuItem className="cursor-pointer">
                <Eye />
                Visualizza
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => copyToClipboard(event.url)}
            >
              <Copy />
              Copia link evento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
