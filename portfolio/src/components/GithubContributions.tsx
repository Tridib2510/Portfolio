"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface GithubContributionsProps {
  isDarkMode: boolean;
  username?: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export const GithubContributions: React.FC<GithubContributionsProps> = ({
  isDarkMode,
  username = "Tridib2510",
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/github-contributions?username=${username}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const raw = Array.isArray(data.contributions)
          ? data.contributions
          : Object.keys(data.contributions).map((date) => ({
              date,
              count: data.contributions[date],
            }));

        let total = 0;

        const parsed = raw
          .map((d: any) => {
            const count = Number(d.count ?? d.contributionCount ?? 0);
            const date = String(d.date ?? "");
            if (!date) return null;
            total += count;

            let level = 0;
            if (count >= 10) level = 4;
            else if (count >= 7) level = 3;
            else if (count >= 4) level = 2;
            else if (count >= 1) level = 1;

            return { date, count, level };
          })
          .filter(Boolean) as ContributionDay[];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const map = new Map(parsed.map((d) => [d.date, d]));
        const days: ContributionDay[] = [];

        for (let i = 364; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const ds = d.toISOString().split("T")[0];
          days.push(map.get(ds) ?? { date: ds, count: 0, level: 0 });
        }

        setContributions(days);
        setTotalContributions(total);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const getColor = (level: number) =>
    isDarkMode
      ? ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"][level]
      : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"][level];

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const months = () => {
    const seen = new Set();
    return weeks
      .map((w, i) => {
        const d = new Date(w[0].date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (seen.has(key)) return null;
        seen.add(key);
        return { label: d.toLocaleString("en-US", { month: "short" }), i };
      })
      .filter(Boolean) as { label: string; i: number }[];
  };

  return (
    <motion.div
      id="github"
      className="w-full px-[6%] sm:px-[12%] py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <h2 className="text-center text-4xl sm:text-5xl font-ovo mb-6">
        My Contributions
      </h2>

      {!loading && !error && (
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xl font-bold mb-4">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>

          <div
            className={`rounded-xl border p-4 sm:p-6 ${
              isDarkMode
                ? "border-white/20 bg-white/5"
                : "border-gray-300 bg-white"
            }`}
          >
            {/* HORIZONTAL ONLY */}
            <div className="overflow-x-auto overflow-y-hidden">
              {/* MONTH LABELS */}
              <div
                className="relative mb-2 min-w-max"
                style={{ paddingLeft: 28, height: 16 }}
              >
                {months().map(({ label, i }) => (
                  <span
                    key={i}
                    className="absolute text-xs text-gray-500"
                    style={{ left: i * 14 }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex gap-1 min-w-max relative">
                {/* GRID */}
                <div className="flex gap-1">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                      {week.map((day) => (
                        <motion.div
                          key={day.date}
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 1.25 }}
                          className="relative"
                        >
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: getColor(day.level) }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GithubContributions;
