"use client"

import { ReactNode, RefObject, useEffect, useRef } from "react"
import { ChevronUp, Loader } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"


type PopoverFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
  openChild?: ReactNode
  successChild?: ReactNode
  showSuccess: boolean
  width?: string
  height?: string
  showCloseButton?: boolean
  title: ReactNode;
}

export function PopoverForm({
  open,
  setOpen,
  openChild,
  showSuccess,
  successChild,
  width = "364px",
  height = "192px",
  title,
  showCloseButton = false,
}: PopoverFormProps) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="flex min-h-[120px] w-full items-center justify-center relative">
      {!open && (
<motion.button
  layoutId={`${title}-wrapper`}
  onClick={() => setOpen(true)}
  whileTap={{ scale: 0.96 }}
  style={{ borderRadius: 999 }}
  className="inline-flex items-center justify-center min-h-[44px] px-4 bg-transparent border-none cursor-pointer outline-none touch-manipulation"
>
    <motion.span layoutId={`${title}-title`}>
      {title}
    </motion.span>
  </motion.button>
)}
      <AnimatePresence>
        {open && (
          <motion.div
  layoutId={`${title}-wrapper`}
  ref={ref}
  style={{ borderRadius: 12 }}
  className="
    absolute z-50
    p-1
    overflow-hidden
    bg-[#FFF4EA]
    shadow-[0_8px_30px_rgba(244,162,89,0.35)]
    max-h-[70vh]

    w-[min(420px,92vw)]
  "
>
               <motion.span
  layoutId={`${title}-title`}
  style={{ opacity: open ? 0 : 1 }}

              className="absolute left-4 top-[17px] text-sm text-muted-foreground"
            >
              {title}
            </motion.span>

            {showCloseButton && (
              <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 z-20">
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center"
                  aria-label="Close"
                >
                  <ChevronUp className="text-muted-foreground/80" />
                </button>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="flex h-full items-center justify-center"
                >
                  {successChild}
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4 }}
  className="
  h-full rounded-md
  bg-[#FFF7F0]
  border border-[#F4A259]/30
  pt-10 px-4 pb-4
  overflow-y-auto
"
          >
                  {openChild}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PopoverFormButton({
  loading,
  text = "Submit",
}: {
  loading: boolean
  text: string
}) {
  return (
    <button
      type="submit"
      className="ml-auto flex h-7 px-3 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-semibold"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={String(loading)}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? <Loader className="size-3 animate-spin" /> : text}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler(event)
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
