"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export function AnimatedNumber({
  end,
  duration = 1500,
  suffix = "",
}: AnimatedNumberProps) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        1 + (end - 1) * easedProgress
      );

      setCount(currentValue);

      if (progress >= 1) {
        // Restart animation
        startTime = timestamp;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}