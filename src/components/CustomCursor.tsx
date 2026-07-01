"use client";

import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
}
const COLORS = ["#a78bfa", "#818cf8", "#e879f9", "#38bdf8", "#ffffff"];
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -180, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const particleId = useRef(0);
  const trailId = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
      // Trail dot
      const dot: TrailDot = {
        id: trailId.current++,
        x,
        y,
        opacity: 1,
      };
      setTrail((prev) => [...prev.slice(-12), dot]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      setIsHovering(!!target.closest('a, button, [role="button"]'));
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn particles on click
      const newParticles: Particle[] = Array.from({ length: 10 }, () => ({
        id: particleId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
      }));
      setParticles((prev) => [...prev, ...newParticles]);
      // Remove particles after animation

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
        );
      }, 800);
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: 6 * (index / trail.length),
            height: 6 * (index / trail.length),
            transform: "translate(-50%, -50%)",
            background: `rgba(167, 139, 250, ${(index / trail.length) * 0.6})`,
            filter: "blur(1px)",
          }}
        />
      ))}
      {/* Click particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-[9999] rounded-full animate-ping"
          style={{
            left: p.x + p.vx * 10,
            top: p.y + p.vy * 10,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: "translate(-50%, -50%)",
            opacity: p.opacity,
            filter: `blur(0.5px) drop-shadow(0 0 4px ${p.color})`,
            transition: "all 0.8s ease-out",
          }}
        />
      ))}
      {/* Magic wand cursor SVG */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(0, 0) rotate(-35deg) scale(${isHovering ? 1.3 : 1})`,
          filter: "drop-shadow(0 0 6px rgba(167,139,250,0.8))",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {/* Wand stick */}
          <line
            x1="4"
            y1="20"
            x2="16"
            y2="8"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Wand tip star */}
          <polygon
            points="17,2 18.5,6 23,6 19.5,8.5 21,12.5 17,10 13,12.5 14.5,8.5 11,6 15.5,6"
            fill="#a78bfa"
            stroke="white"
            strokeWidth="0.5"
          />
          {/* Sparkles */}
          <circle cx="7" cy="14" r="1" fill="#e879f9" opacity="0.8" />
          <circle cx="10" cy="18" r="0.8" fill="#38bdf8" opacity="0.7" />
          <circle cx="4" cy="17" r="0.6" fill="#a78bfa" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}
