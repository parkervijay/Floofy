import * as React from "react"

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  // Floofy paw logo
  logo: (props: IconProps) => (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="20" cy="18" r="6" />
      <circle cx="44" cy="18" r="6" />
      <circle cx="16" cy="36" r="6" />
      <circle cx="48" cy="36" r="6" />
      <path d="M32 28c-8 0-14 6-14 12s6 14 14 14 14-8 14-14-6-12-14-12z" />
    </svg>
  ),

  // Twitter / X (new official logo)
  x: (props: IconProps) => (
    <svg
      viewBox="0 0 1200 1227"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284Z" />
    </svg>
  ),
}
