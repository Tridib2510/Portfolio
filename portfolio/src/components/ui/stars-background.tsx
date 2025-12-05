"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarsBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateStars = () => {
      container.innerHTML = "";
      const area = window.innerWidth * window.innerHeight;
      const numberOfStars = Math.floor(area * starDensity);

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const willTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        const twinkleSpeed =
          Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) +
          minTwinkleSpeed;

        star.style.position = "absolute";
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = "white";
        star.style.borderRadius = "50%";
        star.style.opacity = Math.random() * 0.5 + 0.5;

        if (willTwinkle) {
          star.style.animation = `twinkle ${twinkleSpeed}s ease-in-out infinite`;
          star.style.animationDelay = `${Math.random() * twinkleSpeed}s`;
        }

        container.appendChild(star);
      }
    };

    updateStars();

    const handleResize = () => {
      updateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ zIndex: 0 }}
    />
  );
};

