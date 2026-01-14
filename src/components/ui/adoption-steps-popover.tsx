"use client"

import { useState } from "react"
import { PopoverForm } from "@/components/ui/popover-form"
import { Download, UserCheck, HeartHandshake } from "lucide-react"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";


export function AdoptionStepsPopover() {
  const [open, setOpen] = useState(false)

  return (
    <PopoverForm
      title={
        <div className="rounded-full border-2 border-[#F4A259]/40 bg-[#FFF7F0] px-6 py-3 md:px-8 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
          <AnimatedShinyText className="text-base md:text-lg font-semibold">
            Know more about adoption →
          </AnimatedShinyText>
        </div>
      }
      open={open}
      setOpen={setOpen}
      width="420px"
      height="260px"
      showCloseButton
      showSuccess={false}
      openChild={
        <div className="p-4 space-y-4 bg-[#FFF7F0] rounded-lg">
          <h3 className="text-sm font-semibold text-foreground">
            Adopt with Floofy in 3 simple steps
          </h3>

          {/* STEP 1 */}
          <Step
            icon={<Download size={18} />}
            title="Download the Floofy app"
            description="Get the Floofy app from the Apple App Store and create your account."
          />

          {/* STEP 2 */}
          <Step
            icon={<UserCheck size={18} />}
            title="Find your perfect companion"
            description="Browse verified pets, check profiles, and apply for adoption."
          />

          {/* STEP 3 */}
          <Step
            icon={<HeartHandshake size={18} />}
            title="Complete adoption & welcome home"
            description="Finish verification, connect with shelters, and bring your pet home."
          />
        </div>
      }
    />
  )
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-primary">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}