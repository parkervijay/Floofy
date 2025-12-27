"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  setApi?: (api: any) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function Carousel({ setApi, className, children }: CarouselProps) {
  const [ref, api] = useEmblaCarousel({ loop: true });

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="flex">{children}</div>
    </div>
  );
}

export function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
}
