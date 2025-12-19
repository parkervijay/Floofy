import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";
import LegacyScripts from "@/components/LegacyScripts";
import CustomCursor from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "Floofy - Adoption made responsible",
  description:
    "Connecting verified shelters, NGOs, and loving families through transparent, responsible pet adoption.",
};

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="cursor-none">
        {/* Custom Cursor */}
        <CustomCursor />
        <div id="cursor-trail-root"></div>
        {/* Page content */}
        {children}
<Navbar />

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="logo">Floofy</span>
                <p className="footer-tagline">Adoption made responsible</p>
              </div>
              <ul className="footer-links">
                <li>
                  <Link href="/">Adoption</Link>
                </li>
                <li>
                  <Link href="/education">Education</Link>
                </li>
                <li>
                  <Link href="/care">Care</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>

        {/* Legacy scripts (carousel, loader, etc) */}
        <LegacyScripts />
      </body>
    </html>
  );
}
