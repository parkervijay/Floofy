"use client";

import * as React from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  suffix?: string;
  change?: number;
  changeDescription?: string;
  icon?: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      suffix,
      change,
      changeDescription,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = typeof change === "number" ? change >= 0 : true;

    const motionValue = useSpring(0, {
      damping: 100,
      stiffness: 100,
    });

    const displayValue = useTransform(motionValue, (latest) =>
      Math.round(latest).toLocaleString()
    );

    React.useEffect(() => {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value, motionValue]);

    const ariaLabel =
      typeof change === "number" && changeDescription
        ? `${title}: ${value}. Change is ${change > 0 ? "+" : ""}${change} from ${changeDescription}.`
        : `${title}: ${value}.`;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow",
          className
        )}
        aria-label={ariaLabel}
        role="region"
        {...props}
      >
        {/* Value */}
        <div className="flex items-baseline gap-1">
          <motion.h3 className="text-5xl font-bold tracking-tighter">
            {displayValue}
          </motion.h3>
          {suffix && (
            <span className="text-2xl font-semibold text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="text-base text-muted-foreground">{title}</p>

        {/* Change indicator (only when provided) */}
        {typeof change === "number" && icon && changeDescription && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className={cn(
                "flex items-center justify-center rounded-full p-1.5",
                isPositive ? "bg-green-500/20" : "bg-red-500/20"
              )}
            >
              {icon}
            </span>
            <p className="text-sm text-muted-foreground">
              <span
                className={cn(
                  "font-semibold",
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {isPositive ? "+" : ""}
                {change}
              </span>
              <span> from {changeDescription}</span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
