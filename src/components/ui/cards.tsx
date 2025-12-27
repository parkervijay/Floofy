import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";
