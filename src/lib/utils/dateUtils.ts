/**
 * Formats a date string from ISO format to "DD MonthName YYYY" in Italian
 * @param isoDate - Date string in ISO format (e.g., "2025-03-30T16:00:00")
 * @returns Formatted date string in Italian format (e.g., "30 Marzo 2025")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Italian month names
  const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  // Get day, month name, and year
  const day = date.getDate().toString().padStart(2, "0");
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
}
