import { NextResponse } from "next/server";

const ADS_API_URL = "https://api.adsabs.harvard.edu/v1/search/query";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_ADS_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "ADS API token missing" },
      { status: 500 }
    );
  }

  try {
    // Fetch citation + h-index summary for your library
    const response = await fetch(
      `${ADS_API_URL}?q=docs(library/ucoKF0gWQImVPLgZJ5pdlw)&fl=citation_count,h_index&rows=200`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    const docs = data?.response?.docs || [];
    const totalCitations = docs.reduce(
      (sum: number, d: any) => sum + (d.citation_count || 0),
      0
    );

    // Approximate h-index calculation
    const sorted = docs
      .map((d: any) => d.citation_count || 0)
      .sort((a: number, b: number) => b - a);
    let hIndex = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] >= i + 1) hIndex = i + 1;
    }

    return NextResponse.json({ totalCitations, hIndex });
  } catch (err: any) {
    console.error("ADS fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch ADS data" },
      { status: 500 }
    );
  }
}
