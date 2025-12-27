import * as React from "react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "text-center mt-[calc(var(--nav-height)+3rem)] mb-14",
        className
      )}
    >
      <AnimatedText
        text={title}
        textClassName="text-4xl md:text-5xl"
        underlineDuration={1.4}
      />

      {subtitle && (
        <p className="mt-6 text-lg text-[var(--grey-medium)] max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
