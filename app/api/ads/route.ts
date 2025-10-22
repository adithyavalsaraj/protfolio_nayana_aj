import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const ADS_API_URL = "https://api.adsabs.harvard.edu/v1/search/query";

const normalize = (s: string) =>
  s.toLowerCase().replace(/[.;,]/g, "").replace(/\s+/g, " ").trim();

// Fallback matcher for papers without ORCID linkage
const matchesTargetName = (name: string): boolean => {
  const n = normalize(name);
  const variants = [
    "nayana aj",
    "aj nayana",
    "a j nayana",
    "nayana a j",
    "nayana, a j",
    "a j, nayana",
  ];
  return variants.some((v) => n.includes(v));
};

export async function GET() {
  const token = process.env.ADS_API_TOKEN;
  const orcid = process.env.ADS_ORCID_ID;

  if (!token) {
    return NextResponse.json(
      { error: "ADS API token missing" },
      { status: 500 }
    );
  }

  try {
    // 1️⃣ Fetch your entire library (not ORCID-filtered)
    const baseQuery = `docs(library/ucoKF0gWQImVPLgZJ5pdlw)`;
    const url =
      `${ADS_API_URL}?q=${encodeURIComponent(baseQuery)}` +
      `&fl=title,author,orcid_pub,orcid_user,first_author,pub,pub_raw,doi,bibcode,abstract,pubdate,citation_count,doctype,property` +
      `&rows=200&sort=pubdate desc`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`ADS error ${res.status}`);
    const data = await res.json();
    const docs = (data?.response?.docs || []) as any[];

    // 2️⃣ Global metrics
    const citationCounts = docs
      .map((d) => Number(d.citation_count || 0))
      .sort((a, b) => b - a);
    const totalCitations = citationCounts.reduce((a, b) => a + b, 0);
    let hIndex = 0;
    for (let i = 0; i < citationCounts.length; i++) {
      if (citationCounts[i] >= i + 1) hIndex = i + 1;
    }

    // 3️⃣ Filter to publications (keep refereed + arXiv + in press)
    const publicationDocs = docs.filter((d) => {
      const pub = (d.pub || d.pub_raw || "").toLowerCase();
      const type = (d.doctype || "").toLowerCase();
      const props = Array.isArray(d.property)
        ? d.property.map((p: string) => p.toLowerCase())
        : [];

      const looksLikeJournal =
        pub.includes("apj") ||
        pub.includes("mnras") ||
        pub.includes("nature") ||
        pub.includes("science") ||
        pub.includes("a&a") ||
        pub.includes("pasp") ||
        pub.includes("aj") ||
        pub.includes("araa");

      const isExcluded =
        pub.includes("atel") ||
        pub.includes("telegram") ||
        pub.includes("gcn") ||
        pub.includes("tns") ||
        pub.includes("iauc") ||
        pub.includes("circular") ||
        pub.includes("bulletin") ||
        type.includes("catalog") ||
        type.includes("software");

      // include refereed or journal or arxiv preprint
      const isIncluded =
        props.includes("refereed") ||
        looksLikeJournal ||
        pub.includes("arxiv") ||
        pub.includes("preprint") ||
        pub.includes("in press") ||
        pub.includes("under review");

      return isIncluded && !isExcluded;
    });

    // 4️⃣ Determine author role (ORCID → fallback name position)
    const publications = publicationDocs
      .map((d) => {
        const authors = Array.isArray(d.author) ? d.author : [];
        const orcidList = Array.isArray(d.orcid_pub) ? d.orcid_pub : [];

        // 🧠 Determine author role
        let role = "Unknown";

        if (orcid && orcidList.includes(orcid)) {
          const idx = orcidList.indexOf(orcid);
          if (idx === 0) role = "First Author";
          else if (idx === 1) role = "Second Author";
          else role = "Co-author";
        } else {
          const idx = authors.findIndex((a: any) => matchesTargetName(a));
          if (idx === 0) role = "First Author";
          else if (idx === 1) role = "Second Author";
          else if (idx > 1) role = "Co-author";
        }

        return {
          title: Array.isArray(d.title) ? d.title[0] : d.title ?? "",
          authors: Array.isArray(d.author)
            ? d.author.join("; ")
            : d.author ?? "",
          journal: d.pub_raw || d.pub || "",
          pubdate: d.pubdate || "",
          year: d.pubdate ? Number(String(d.pubdate).slice(0, 4)) : undefined,
          doi: Array.isArray(d.doi) ? d.doi[0] : d.doi ?? "",
          bibcode: d.bibcode || "",
          abstract: d.abstract || "",
          citationCount: Number(d.citation_count || 0),
          adsUrl: d.bibcode
            ? `https://ui.adsabs.harvard.edu/abs/${d.bibcode}/abstract`
            : undefined,
          role, // ✅ defined above
        };
      })
      // ✅ Only keep legitimate author roles
      .filter((p) =>
        ["First Author", "Second Author", "Co-author"].includes(p.role)
      );

    // 5️⃣ Role summary
    const roleStats = publications.reduce((acc, p) => {
      acc[p.role] = (acc[p.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("📊 ADS summary", {
      totalItems: docs.length,
      filteredItems: publications.length,
      roleStats,
    });

    // Sort newest → oldest
    const sortedPublications = publications.sort((a, b) => {
      const aDate = new Date(a.pubdate || `${a.year || 0}-01-01`);
      const bDate = new Date(b.pubdate || `${b.year || 0}-01-01`);
      return bDate.getTime() - aDate.getTime();
    });

    // 🔹 Role counts
    const firstAuthorCount = publications.filter(
      (p) => p.role === "First Author"
    ).length;
    const secondAuthorCount = publications.filter(
      (p) => p.role === "Second Author"
    ).length;
    const coAuthorCount = publications.filter(
      (p) => p.role === "Co-author"
    ).length;
    const totalPublications = publications.length;

    return NextResponse.json({
      totalItems: docs.length,
      filteredItems: totalPublications,
      totalPublications,
      firstAuthorCount,
      secondAuthorCount,
      coAuthorCount,
      totalCitations,
      hIndex,
      publications: sortedPublications,
    });
  } catch (err) {
    console.error("ADS fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch ADS data" },
      { status: 500 }
    );
  }
}
