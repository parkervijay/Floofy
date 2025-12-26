"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 md:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 md:pt-4 pointer-events-none",
        className
      )}
    >
      {/* ONLY this wrapper is clickable */}
      <div className="pointer-events-auto">
        <div className="flex items-center gap-2 rounded-full border border-[#F4A259]/30 bg-[#FFF7F0]/80 backdrop-blur-lg px-1 py-1 shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.url

            return (
              <Link
                key={item.name}
                href={item.url}
                className={cn(
                  "relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  "text-[#7A4A1F] hover:text-[#F4A259]",
                  isActive && "text-[#F4A259]"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="floofy-lamp"
                    className="absolute inset-0 -z-10 rounded-full bg-[#F4A259]/10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-1 w-8 rounded-t-full bg-[#F4A259]">
                      <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-[#F4A259]/30 blur-md" />
                      <div className="absolute -top-1 h-6 w-8 rounded-full bg-[#F4A259]/30 blur-md" />
                      <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-[#F4A259]/30 blur-sm" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
