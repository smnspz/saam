import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text);
    toast.success("Link copiato negli appunti");
  } catch (error) {
    console.error("Failed to copy to clipboard", error);
  }
}
