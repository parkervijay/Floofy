import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LegacyScripts from "@/components/LegacyScripts";
import CustomCursor from "@/components/ui/custom-cursor";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";


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
  <body className="relative min-h-screen overflow-x-hidden">
    {/* Background (always behind) */}
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(255,244,235)"
      gradientBackgroundEnd="rgb(255,255,255)"
      firstColor="244,162,89"
      secondColor="255,200,150"
      thirdColor="255,180,120"
      fourthColor="255,160,100"
      fifthColor="255,210,170"
      interactive={false}
    />

    {/* Cursor */}
    <CustomCursor />

    {/* App content */}
    <div className="relative z-10">
      <Navbar />
      {children}

      <footer className="mt-24 pb-10">
        <div className="container">
          <span className="logo">Floofy</span>
        </div>
      </footer>
    </div>

    <LegacyScripts />
  </body>
</html>
  );
}
