import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortPublicationsByDate(publications: any[]) {
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const getMonthIndex = (date?: string) => {
    if (!date) return -1;
    const lower = date.toLowerCase();
    return monthNames.findIndex((m) => lower.includes(m));
  };

  const getDay = (date?: string) => {
    const match = date?.match(/\b(\d{1,2})\b/);
    return match ? parseInt(match[1]) : 0;
  };

  return [...publications].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const monthA = getMonthIndex(a.date);
    const monthB = getMonthIndex(b.date);
    if (monthA !== monthB) return monthB - monthA;
    return getDay(b.date) - getDay(a.date);
  });
}
