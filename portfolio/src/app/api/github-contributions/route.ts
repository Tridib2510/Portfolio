import { NextResponse } from "next/server";

interface Contribution {
  date: string;
  count: number;
}

interface JogruberContribution {
  date: string;
  count: number;
}

interface JogruberResponse {
  contributions?: JogruberContribution[] | Record<string, number>;
}

interface DenoResponse {
  contributions?: Record<string, number>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Tridib2510";

  return fetchContributionsAlternative(username);
}

async function fetchContributionsAlternative(username: string) {
  try {
    const contributions: Contribution[] = [];

    /* ---------------- Method 1: jogruber.de ---------------- */
    try {
      const apiResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}`,
        { headers: { "User-Agent": "Portfolio-App" } }
      );

      if (apiResponse.ok) {
        const apiData: JogruberResponse = await apiResponse.json();

        if (Array.isArray(apiData.contributions)) {
          apiData.contributions.forEach((item) => {
            if (item.date && typeof item.count === "number") {
              contributions.push({ date: item.date, count: item.count });
            }
          });
        } else if (apiData.contributions) {
          Object.entries(apiData.contributions).forEach(([date, count]) => {
            if (typeof count === "number") {
              contributions.push({ date, count });
            }
          });
        }

        if (contributions.length > 0) {
          contributions.sort(sortByDate);
          return NextResponse.json({ contributions });
        }
      }
    } catch {
      // silently fail and try next method
    }

    /* ---------------- Method 2: deno.dev ---------------- */
    try {
      const apiResponse = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json`,
        { headers: { "User-Agent": "Portfolio-App" } }
      );

      if (apiResponse.ok) {
        const apiData: DenoResponse = await apiResponse.json();

        if (apiData.contributions) {
          Object.entries(apiData.contributions).forEach(([date, count]) => {
            if (typeof count === "number") {
              contributions.push({ date, count });
            }
          });

          if (contributions.length > 0) {
            contributions.sort(sortByDate);
            return NextResponse.json({ contributions });
          }
        }
      }
    } catch {
      // silently fail
    }

    /* ---------------- Method 3: activity graph (skipped) ---------------- */
    // SVG only – intentionally skipped

    /* ---------------- Method 4: GitHub HTML scrape ---------------- */
    try {
      const response = await fetch(
        `https://github.com/users/${username}/contributions`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html",
          },
        }
      );

      if (response.ok) {
        const html = await response.text();
        const regex =
          /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;

        const seen = new Set<string>();
        let match: RegExpExecArray | null;

        while ((match = regex.exec(html)) !== null) {
          const date = match[1];
          const count = Number(match[2]);

          if (!seen.has(date)) {
            contributions.push({ date, count });
            seen.add(date);
          }
        }

        if (contributions.length > 0) {
          contributions.sort(sortByDate);
          return NextResponse.json({ contributions });
        }
      }
    } catch {
      // silently fail
    }

    /* ---------------- Final fallback: empty year ---------------- */
    if (contributions.length === 0) {
      const today = new Date();
      for (let i = 370; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        contributions.push({
          date: d.toISOString().split("T")[0],
          count: 0,
        });
      }
    }

    contributions.sort(sortByDate);
    return NextResponse.json({ contributions });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

function sortByDate(a: Contribution, b: Contribution) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}
