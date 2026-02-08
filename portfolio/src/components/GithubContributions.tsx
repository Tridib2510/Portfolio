"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github } from "lucide-react";

interface GithubContributionsProps {
  isDarkMode: boolean;
  username?: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

/* ---------- API response typing ---------- */

interface RawContribution {
  date?: string;
  dateString?: string;
  count?: number;
  contributionCount?: number;
}

interface GithubContributionsResponse {
  contributions:
    | RawContribution[]
    | Record<string, number>;
}

export const GithubContributions: React.FC<GithubContributionsProps> = ({
  isDarkMode,
  username = "Tridib2510",
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/github-contributions?username=${username}`
        );
        if (!res.ok) throw new Error("Failed to fetch contributions");

        const data: GithubContributionsResponse = await res.json();

        const raw: RawContribution[] = Array.isArray(data.contributions)
          ? data.contributions
          : Object.entries(data.contributions).map(([date, count]) => ({
              date,
              count,
            }));

        let total = 0;

        const parsed: ContributionDay[] = raw
          .map((item) => {
            const count = Number(
              item.count ?? item.contributionCount ?? 0
            );
            const date = String(item.date ?? item.dateString ?? "");

            if (!date) return null;

            total += count;

            let level = 0;
            if (count >= 10) level = 4;
            else if (count >= 7) level = 3;
            else if (count >= 4) level = 2;
            else if (count >= 1) level = 1;

            return { date, count, level };
          })
          .filter((d): d is ContributionDay => d !== null);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const map = new Map(parsed.map((d) => [d.date, d]));
        const days: ContributionDay[] = [];

        for (let i = 364; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const ds = d.toISOString().split("T")[0];

          days.push(
            map.get(ds) ?? { date: ds, count: 0, level: 0 }
          );
        }

        setContributions(days);
        setTotalContributions(total);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error"
        );
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
    const seen = new Set<string>();
    return weeks
      .map((week, i) => {
        const first = week[0];
        if (!first) return null;

        const date = new Date(first.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;

        if (seen.has(key)) return null;
        seen.add(key);

        return {
          label: date.toLocaleString("en-US", { month: "short" }),
          i,
        };
      })
      .filter(
        (m): m is { label: string; i: number } => m !== null
      );
  };

  const LoadingSkeleton = () => (
    <div className="max-w-5xl mx-auto">
      <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-6 animate-pulse" />
      <div
        className={`rounded-xl border p-4 sm:p-6 ${
          isDarkMode ? "border-white/20 bg-white/5" : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex gap-1 min-w-max">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className={`w-3 h-3 rounded-sm animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="max-w-5xl mx-auto">
      <div
        className={`rounded-xl border p-8 text-center ${
          isDarkMode ? "border-red-500/30 bg-red-500/10" : "border-red-300 bg-red-50"
        }`}
      >
        <Github className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <p className="text-red-500 mb-4">{message}</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode
              ? "bg-white/10 hover:bg-white/20"
              : "bg-gray-100 hover:bg-gray-200"
          } transition-colors`}
        >
          <Github className="w-4 h-4" />
          View GitHub Profile
        </a>
      </div>
    </div>
  );

  const Tooltip = () => (
    <AnimatePresence>
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
          }}
        >
          <div
            className={`rounded-lg px-3 py-2 text-xs shadow-lg border ${
              isDarkMode
                ? "bg-gray-900 border-white/20 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="font-semibold mb-1">
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div>{hoveredDay.count} contributions</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const Legend = () => (
    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: getColor(level) }}
        />
      ))}
      <span>More</span>
    </div>
  );

  return (
    <>
      <motion.div
        id="github"
        className="w-full px-[6%] sm:px-[12%] py-16 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
        
        <h2 className="text-center text-4xl sm:text-5xl font-ovo mb-4 relative z-10">
          My Contributions
        </h2>
        
        <p className="text-center text-gray-500 mb-8 relative z-10">
          Tracking my coding journey through GitHub contributions
        </p>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState message={error} />
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-5xl mx-auto relative z-10"
            >
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className={`text-5xl sm:text-6xl font-bold bg-gradient-to-r ${
                      isDarkMode
                        ? "from-green-400 to-emerald-500"
                        : "from-green-600 to-emerald-700"
                    } bg-clip-text text-transparent`}
                  >
                    {totalContributions.toLocaleString()}
                  </motion.div>
                  <div className="text-sm text-gray-500 mt-1">Contributions</div>
                </div>

                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? "bg-white/10 hover:bg-white/20 border border-white/20"
                      : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">@{username}</span>
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`rounded-2xl border p-4 sm:p-6 backdrop-blur-sm ${
                  isDarkMode
                    ? "border-white/20 bg-white/5 shadow-lg shadow-green-500/10"
                    : "border-gray-200 bg-white/80 shadow-lg"
                }`}
              >
                <div className="overflow-x-auto overflow-y-hidden">
                  {/* Month labels */}
                  <div
                    className="relative mb-2 min-w-max"
                    style={{ paddingLeft: 28, height: 16 }}
                  >
                    {months().map(({ label, i }) => (
                      <span
                        key={i}
                        className="absolute text-xs text-gray-500 font-medium"
                        style={{ left: i * 14 }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Grid */}
                  <div className="flex gap-1 min-w-max">
                    {weeks.map((week, wi) => (
                      <motion.div
                        key={wi}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: wi * 0.02 }}
                        className="flex flex-col gap-1"
                      >
                        {week.map((day) => (
                          <motion.div
                            key={day.date}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 1.3 }}
                            onMouseEnter={(e) => {
                              setHoveredDay(day);
                              setMousePosition({
                                x: e.clientX,
                                y: e.clientY,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className="cursor-pointer"
                          >
                            <div
                              className="w-3 h-3 rounded-sm transition-all duration-200"
                              style={{
                                backgroundColor: getColor(day.level),
                                boxShadow: day.level > 0
                                  ? isDarkMode
                                    ? `0 0 8px ${getColor(day.level)}40`
                                    : `0 2px 4px ${getColor(day.level)}30`
                                  : undefined,
                              }}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Legend />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Tooltip />
    </>
  );
};

export default GithubContributions;
