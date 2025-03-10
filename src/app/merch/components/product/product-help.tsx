import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ReactElement } from "react";

export const HelpButton = ({
  className,
  children,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      variant="ghost"
      className={`${className} inline-flex items-center text-sm cursor-pointer`}
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};

function ClothingHelp(): ReactElement<React.FC> {
  return (
    <>
      <HelpButton>Dettagli prodotto</HelpButton>
      <HelpButton>Guida alle taglie</HelpButton>
      <HelpButton>Spedizione</HelpButton>
    </>
  );
}

function MusicHelp(): ReactElement<React.FC> {
  return (
    <>
      <HelpButton>Dettagli prodotto</HelpButton>
      <HelpButton>Spedizione</HelpButton>
    </>
  );
}

function DefaultHelp(): ReactElement<React.FC> {
  return <HelpButton>Dettagli prodotto</HelpButton>;
}
