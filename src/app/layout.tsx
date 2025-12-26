import "./globals.css";
import type { Metadata } from "next";
import AppNavbar from "@/components/AppNavbar";
import LegacyScripts from "@/components/LegacyScripts";
import CustomCursor from "@/components/ui/custom-cursor";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"
import ScrollAnimations from "@/components/ScrollAnimations";






export const metadata: Metadata = {
  title: "Floofy",
  description:
    "Connecting verified shelters, NGOs, and loving families through transparent, responsible pet adoption.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};
export default function RootLayout({
  
  
  children,
}: {
  children: React.ReactNode;
}) 
{
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
    <AppNavbar />
      {children}

      <StackedCircularFooter />

    </div>
    
<ScrollAnimations />

    <LegacyScripts />
  </body>
</html>
  );
}
