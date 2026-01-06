import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Tridib2510";

  return await fetchContributionsAlternative(username);
}

async function fetchContributionsAlternative(username: string) {
  try {
    // Try multiple APIs to get GitHub contribution data
    const contributions: { date: string; count: number }[] = [];
    
    // Method 1: Try github-contributions-api.jogruber.de (v4 API)
    try {
      const apiResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}`,
        {
          headers: {
            "User-Agent": "Portfolio-App",
          },
        }
      );
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        // The v4 API returns data in a different format
        if (apiData.contributions && Array.isArray(apiData.contributions)) {
          apiData.contributions.forEach((item: any) => {
            if (item.date && typeof item.count === 'number') {
              contributions.push({ date: item.date, count: item.count });
            }
          });
        } else if (apiData.contributions && typeof apiData.contributions === 'object') {
          // Transform object format to array
          Object.keys(apiData.contributions).forEach((date) => {
            const count = apiData.contributions[date];
            if (typeof count === 'number') {
              contributions.push({ date, count });
            }
          });
        }
        
        if (contributions.length > 0) {
          contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          return NextResponse.json({ contributions });
        }
      }
    } catch (e) {
      console.log("Method 1 (jogruber) failed, trying next method");
    }

    // Method 2: Try github-contributions-api.deno.dev
    try {
      const apiResponse = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json`,
        {
          headers: {
            "User-Agent": "Portfolio-App",
          },
        }
      );
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        if (apiData.contributions && typeof apiData.contributions === 'object') {
          // Transform object format to array
          Object.keys(apiData.contributions).forEach((date) => {
            const count = apiData.contributions[date];
            if (typeof count === 'number') {
              contributions.push({ date, count });
            }
          });
          
          if (contributions.length > 0) {
            contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            return NextResponse.json({ contributions });
          }
        }
      }
    } catch (e) {
      console.log("Method 2 (deno.dev) failed, trying next method");
    }

    // Method 3: Try github-readme-activity-graph API
    try {
      const graphResponse = await fetch(
        `https://github-readme-activity-graph.vercel.app/graph?username=${username}`,
        {
          headers: {
            "User-Agent": "Portfolio-App",
          },
        }
      );
      
      // This returns an SVG, so we'd need to parse it
      // For now, skip this method
    } catch (e) {
      console.log("Method 3 failed, trying next method");
    }

    // Method 4: Try to fetch from GitHub's contribution page (may not work due to dynamic loading)
    try {
      const response = await fetch(
        `https://github.com/users/${username}/contributions`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        }
      );

      if (response.ok) {
        const html = await response.text();
        
        // Try to extract contribution data from HTML
        const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;
        const seenDates = new Set<string>();
        let match;
        
        while ((match = regex.exec(html)) !== null) {
          const date = match[1];
          const count = parseInt(match[2], 10);
          if (!seenDates.has(date)) {
            contributions.push({ date, count });
            seenDates.add(date);
          }
        }
        
        if (contributions.length > 0) {
          contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          return NextResponse.json({ contributions });
        }
      }
    } catch (e) {
      console.log("Method 4 failed");
    }

    // Final fallback: generate a year's worth of empty data
    if (contributions.length === 0) {
      const today = new Date();
      for (let i = 370; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        contributions.push({ date: dateStr, count: 0 });
      }
    }

    // Sort by date
    contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ contributions });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch contributions: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
