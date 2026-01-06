export const runtime = "nodejs";

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

  return fetchContributions(username);
}

async function fetchContributions(username: string) {
  try {
    const contributions: Contribution[] = [];

    /* ---------------- Method 1: jogruber.de ---------------- */
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}`,
        {
          headers: { "User-Agent": "Portfolio-App" },
          next: { revalidate: 3600 },
        }
      );

      if (res.ok) {
        const data: JogruberResponse = await res.json();

        if (Array.isArray(data.contributions)) {
          for (const { date, count } of data.contributions) {
            contributions.push({ date, count });
          }
        } else if (data.contributions) {
          for (const [date, count] of Object.entries(data.contributions)) {
            if (typeof count === "number") {
              contributions.push({ date, count });
            }
          }
        }

        if (contributions.length) {
          contributions.sort(sortByDate);
          return Response.json({ contributions });
        }
      }
    } catch {}

    /* ---------------- Method 2: deno.dev ---------------- */
    try {
      const res = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json`,
        {
          headers: { "User-Agent": "Portfolio-App" },
          next: { revalidate: 3600 },
        }
      );

      if (res.ok) {
        const data: DenoResponse = await res.json();

        if (data.contributions) {
          for (const [date, count] of Object.entries(data.contributions)) {
            if (typeof count === "number") {
              contributions.push({ date, count });
            }
          }

          if (contributions.length) {
            contributions.sort(sortByDate);
            return Response.json({ contributions });
          }
        }
      }
    } catch {}

    /* ---------------- Method 3: GitHub HTML scrape ---------------- */
    try {
      const res = await fetch(
        `https://github.com/users/${username}/contributions`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            Accept: "text/html",
          },
          next: { revalidate: 3600 },
        }
      );

      if (res.ok) {
        const html = await res.text();
        const regex =
          /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;

        const seen = new Set<string>();
        let match: RegExpExecArray | null;

        while ((match = regex.exec(html))) {
          if (!seen.has(match[1])) {
            contributions.push({
              date: match[1],
              count: Number(match[2]),
            });
            seen.add(match[1]);
          }
        }

        if (contributions.length) {
          contributions.sort(sortByDate);
          return Response.json({ contributions });
        }
      }
    } catch {}

    /* ---------------- Final fallback ---------------- */
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      contributions.push({
        date: d.toISOString().split("T")[0],
        count: 0,
      });
    }

    return Response.json({ contributions });
  } catch (err) {
    return Response.json(
      {
        error:
          err instanceof Error ? err.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

function sortByDate(a: Contribution, b: Contribution) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}
