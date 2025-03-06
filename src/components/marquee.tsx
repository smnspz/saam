"use client";

import { useEffect, useRef } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
}

function Marquee({ text, speed = 50 }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    let position = 0;
    const width = marqueeElement.offsetWidth;
    const contentWidth = marqueeElement.scrollWidth;

    const animate = () => {
      position -= 1;
      if (position <= -contentWidth / 2) {
        position = 0;
      }

      if (marqueeElement) {
        marqueeElement.style.transform = `translateX(${position}px)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden fixed top-0 left-0 z-50 flex items-center"
      style={{ backgroundColor: "#1D71B8", height: "40px" }}
    >
      <div
        ref={marqueeRef}
        className="whitespace-nowrap text-white font-bold text-lg"
      >
        {` • ${text}`.repeat(20)}
      </div>
    </div>
  );
}

export default Marquee;
