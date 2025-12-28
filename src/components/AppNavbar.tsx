"use client"

import { useEffect, useState } from "react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { PawPrint, BookOpen, HeartHandshake } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Adoption", url: "/", icon: PawPrint },
  { name: "Education", url: "/education", icon: BookOpen },
  { name: "Care", url: "/care", icon: HeartHandshake },
]

export default function AppNavbar() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setHidden(true)
      } else {
        // scrolling up
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        hidden
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      )}
    >
      <NavBar items={navItems} />
    </div>
  )
}
