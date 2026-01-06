"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 4200,
  maxDelay = 8700,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  console.log(starWidth)
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<Array<{
    element: SVGLineElement;
    gradient: SVGGradientElement;
    x: number;
    y: number;
    angle: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    const createShootingStar = () => {
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const length = Math.random() * 100 + 50;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

      const star = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      star.setAttribute("x1", startX.toString());
      star.setAttribute("y1", startY.toString());
      star.setAttribute("x2", endX.toString());
      star.setAttribute("y2", endY.toString());
      star.setAttribute("stroke-width", starHeight.toString());
      star.setAttribute("opacity", "0");

      const gradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      const gradientId = `gradient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      gradient.setAttribute("id", gradientId);
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "100%");
      gradient.setAttribute("y2", "0%");

      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("stop-color", trailColor);
      stop1.setAttribute("stop-opacity", "1");

      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute("stop-color", starColor);
      stop2.setAttribute("stop-opacity", "1");

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);

      star.setAttribute("stroke", `url(#${gradientId})`);
      svg.appendChild(star);

      starsRef.current.push({
        element: star,
        gradient,
        x: startX,
        y: startY,
        angle,
        speed,
        opacity: 0,
      });
    };

    const animate = () => {
      starsRef.current = starsRef.current.filter((star) => {
        const dx = Math.cos(star.angle) * star.speed;
        const dy = Math.sin(star.angle) * star.speed;

        star.x += dx;
        star.y += dy;
        star.opacity = Math.min(star.opacity + 0.05, 1);

        const length = Math.random() * 100 + 50;
        const endX = star.x + Math.cos(star.angle) * length;
        const endY = star.y + Math.sin(star.angle) * length;

        star.element.setAttribute("x1", star.x.toString());
        star.element.setAttribute("y1", star.y.toString());
        star.element.setAttribute("x2", endX.toString());
        star.element.setAttribute("y2", endY.toString());
        star.element.setAttribute("opacity", star.opacity.toString());

        if (
          star.x < -200 ||
          star.x > window.innerWidth + 200 ||
          star.y < -200 ||
          star.y > window.innerHeight + 200
        ) {
          try {
            svg.removeChild(star.element);
            defs?.removeChild(star.gradient);
          } catch (e) {
            // Element already removed
            console.log(e)
          }
          return false;
        }
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const scheduleNext = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(() => {
        createShootingStar();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      starsRef.current.forEach((star) => {
        try {
          svg.removeChild(star.element);
          defs?.removeChild(star.gradient);
        } catch (e) {
          console.log(e)
          // Element already removed
        }
      });
      starsRef.current = [];
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, starColor, trailColor, starHeight]);

  return (
    <svg
      ref={svgRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ zIndex: 1 }}
    >
      <defs />
    </svg>
  );
};

