"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Flashcard {
  question: string;
  answer: string;
}

interface CanvasFlashcardProps {
  flashcards: Flashcard[];
  /**
   * Animation speed multiplier (0.1 = slower, 1.0 = faster)
   * @default 0.4
   */
  animationSpeed?: number;
  /**
   * Size of each dot in pixels
   * @default 3
   */
  dotSize?: number;
  /**
   * Card style variant
   * @default "gradient"
   */
  cardStyle?: "gradient" | "dot-matrix" | "glow" | "minimal";
  /**
   * Additional Tailwind CSS classes for the container
   */
  containerClassName?: string;
}

export const CanvasFlashcard: React.FC<CanvasFlashcardProps> = ({
  flashcards,
  animationSpeed = 0.4,
  dotSize = 3,
  cardStyle = "gradient",
  containerClassName,
}) => {
  const [flipped, setFlipped] = useState<boolean[]>(new Array(flashcards.length).fill(false));

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const gradientVariants = [
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-green-500 to-teal-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-teal-500 to-cyan-500",
    "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  ];

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {flashcards.map((fc, index) => {
          const randomGradient = gradientVariants[index % gradientVariants.length];

          return (
            <Card
              key={index}
              onClick={() => toggleFlip(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFlip(index);
                }
              }}
              className={cn(
                "cursor-pointer transform hover:scale-105 duration-300 rounded-xl overflow-hidden",
                "shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-neutral-800",
                {
                  gradient: randomGradient + " bg-[length:300%_300%] animate-gradient-hard",
                  "dot-matrix": "bg-black",
                  glow: `${randomGradient} animate-pulse`,
                  minimal: "bg-neutral-900",
                }[cardStyle]
              )}
              tabIndex={0}
              role="button"
              aria-label={`Flashcard ${index + 1}: ${flipped[index] ? "Answer" : "Question"}`}
            >
              <CardContent className="relative h-48 flex items-center justify-center p-6">
                {cardStyle === "dot-matrix" && (
                  <DotMatrix
                    colors={[[0, 255, 255], [255, 0, 255], [255, 255, 0]]}
                    opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
                    dotSize={dotSize}
                    animationSpeed={animationSpeed}
                  />
                )}
                <p
                  className={cn(
                    "text-center text-lg font-medium tracking-wide relative z-10",
                    cardStyle === "minimal" ? "text-gray-100" : "text-white"
                  )}
                >
                  {flipped[index] ? fc.answer : fc.question}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  dotSize?: number;
  animationSpeed?: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  dotSize = 2,
  animationSpeed = 0.4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate colors array similar to the original
  const colorsArray = useMemo(() => {
    if (colors.length === 1) return Array(6).fill(colors[0]);
    if (colors.length === 2) return [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    if (colors.length >= 3) return [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    return Array(6).fill([0, 0, 0]);
  }, [colors]);

  // Initialize dots
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalSize = 4; // Grid cell size in pixels
    const numCols = Math.floor(container.offsetWidth / totalSize);
    const numRows = Math.floor(container.offsetHeight / totalSize);

    container.style.gridTemplateColumns = `repeat(${numCols}, ${totalSize}px)`;
    container.style.gridTemplateRows = `repeat(${numRows}, ${totalSize}px)`;

    // Clear existing dots
    container.innerHTML = "";

    // Create dots
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const dot = document.createElement("div");
        const randomIndex = Math.floor(Math.random() * opacities.length);
        const opacity = opacities[randomIndex];
        const colorIndex = Math.floor(Math.random() * colorsArray.length);
        const [r, g, b] = colorsArray[colorIndex];

        dot.className = "dot w-full h-full rounded-full";
        dot.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        dot.style.opacity = `${opacity}`;
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.animation = `fade ${1 / animationSpeed}s infinite ease-in-out`;
        dot.style.animationDelay = `${(row + col) * 0.05 * animationSpeed}s`;

        container.appendChild(dot);
      }
    }
  }, [opacities, colorsArray, dotSize, animationSpeed]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 grid gap-0"
      style={{ fontSize: 0 }} // Remove line-height spacing
      role="presentation"
      aria-hidden="true"
    />
  );
};