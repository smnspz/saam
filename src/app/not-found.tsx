import { SpinningText } from "@/components/magicui/spinning-text";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <SpinningText className="pt-30">
        - niente da vedere qui - 404
      </SpinningText>
      <Link href="/" className="cursor-pointer">
        <Button variant="link">
          <ChevronLeft />
          Torna alla home
        </Button>
      </Link>
    </main>
  );
}
