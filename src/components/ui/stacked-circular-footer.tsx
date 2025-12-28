import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { AnimatedDock } from "@/components/ui/animated-dock"
import { Facebook, Instagram, Linkedin, X } from "lucide-react"






function StackedCircularFooter() {
  return (
   <footer className="relative mt-5 bg-gradient-to-b from-[#FFF8F1] via-[#FFE7CF] to-[#FFD3A6]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Brand */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#F4A259]/20 blur-xl" />
   <div className="relative h-16 w-16 rounded-full overflow-hidden border border-[#F4A259]/30 bg-white/70 backdrop-blur-md">
    <Image
      src="/icon.png"
      alt="Floofy logo"
      fill
      className="object-cover"
      priority
    />
  </div>
          </div>

          {/* Nav
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <a href="/" className="text-[#7A4A1F] hover:text-[#F4A259]">Adoption</a>
            <a href="/education" className="text-[#7A4A1F] hover:text-[#F4A259]">Education</a>
            <a href="/care" className="text-[#7A4A1F] hover:text-[#F4A259]">Care</a>
          </nav> */}

          {/* Social */}
          <div className="flex justify-center">
  <AnimatedDock
    className="bg-transparent border-none shadow-none px-0 pb-0"
    items={[
      {
        link: "https://facebook.com",
        target: "_blank",
        Icon: <Facebook size={18} />,
      },
      {
        link: "https://x.com",
        target: "_blank",
        Icon: <X size={18} />,
      },
      {
        link: "https://instagram.com",
        target: "_blank",
        Icon: <Instagram size={18} />,
      },
      {
        link: "https://linkedin.com",
        target: "_blank",
        Icon: <Linkedin size={18} />,
      },
    ]}
  />
</div>
          {/* Contact */}

          {/* Footer note */}
         <div className="text-[15px] text-[#7A4A1F]/60 text-center space-y-1">
  <p>
    © {new Date().getFullYear()} Floofy  
    <br />
    Built with care for animals and the people who love them
  </p>

  <div className="flex flex-col items-center gap-0.5 text-[#7A4A1F]/50">
    <a
      href="mailto:hello@floofy.app"
      className="hover:text-[#F4A259] transition-colors"
    >
      hello@floofy.app
    </a>
    <a
      href="tel:+910000000000"
      className="hover:text-[#F4A259] transition-colors"
    >
      +91 00000 00000
    </a>
  </div>
</div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
