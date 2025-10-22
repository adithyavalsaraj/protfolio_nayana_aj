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

  const parseDateParts = (date?: string, year?: number) => {
    if (!date && !year) return { y: 0, m: 0, d: 0 };

    // Handle ISO formats like "2025-09-00" or "2025-05-12"
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [y, m, d] = date.split("-").map((x) => parseInt(x, 10));
      return { y, m: m || 0, d: d || 0 };
    }

    // Handle text-based "2025 May 20" or "May 2025"
    const text = date?.toLowerCase() || "";
    const y = year || parseInt(text.match(/\d{4}/)?.[0] || "0", 10);
    const m = monthNames.findIndex((m) => text.includes(m)) + 1 || 0;
    const d = parseInt(text.match(/\b(\d{1,2})\b/)?.[1] || "0", 10);
    return { y, m, d };
  };

  return [...publications].sort((a, b) => {
    const da = parseDateParts(a.pubdate || a.date, a.year);
    const db = parseDateParts(b.pubdate || b.date, b.year);

    // Sort descending (latest → oldest)
    if (da.y !== db.y) return db.y - da.y;
    if (da.m !== db.m) return db.m - da.m;
    return db.d - da.d;
  });
}

export function formatPubDate(rawDate?: string): string {
  if (!rawDate) return "";

  // Support ADS-style "YYYY-MM-DD" formats
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    const [year, month, day] = rawDate.split("-").map((p) => parseInt(p, 10));
    const monthNames = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (month && (!day || day === 0)) {
      // Example: 2025-09-00 → "2025 September"
      return `${year} ${monthNames[month]}`;
    }
    if (month && day) {
      // Example: 2025-04-20 → "2025 April 20"
      return `${year} ${monthNames[month]} ${day}`;
    }
    return `${year}`;
  }

  // Otherwise, fallback for existing free-text dates (e.g. “2024 January 22”)
  return rawDate;
}
