"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="container">
        <Link href="/" className="logo flex items-center gap-2 hover:opacity-90 transition-opacity">
        <span>Floofy</span>
 <Image
  src="/logo.png"
  alt="Floofy logo"
  width={30}
  height={30}
  className="rounded-full"
/>
</Link>

        <button className="mobile-menu-btn" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>

        <ul className="nav-links">
          <li>
            <Link
              href="/"
              className={pathname === "/" ? "active" : ""}
            >
              Adoption
            </Link>
          </li>

          <li>
            <Link
              href="/education"
              className={pathname === "/education" ? "active" : ""}
            >
              Education
            </Link>
          </li>

          <li>
            <Link
              href="/care"
              className={pathname === "/care" ? "active" : ""}
            >
              Care
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
