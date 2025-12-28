"use client";

import { useState, useEffect, useRef } from "react";
import { ReportIncidentForm } from "@/components/care/ReportIncidentForm";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert-1";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

type AlertType = "success" | "destructive";

const circularItems = [
  {
    text: "RESCUE",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  },
  {
    text: "CARE",
    image: "https://images.unsplash.com/photo-1601758177266-bc599de87707?w=800&q=80",
  },
  {
    text: "REPORT",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  },
  {
    text: "PROTECT",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80",
  },
];

export default function CarePage() {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);
  
  const contentSectionRef = useRef<HTMLElement>(null);

  // Smooth scroll to content section
  const scrollToContent = () => {
    contentSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Lock scroll when alert is visible
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    
    if (alert) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    };
  }, [alert]);

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {/* Background Animation - covers entire page */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(255, 247, 237)"
        gradientBackgroundEnd="rgb(254, 243, 230)"
        firstColor="244, 162, 89"
        secondColor="251, 191, 120"
        thirdColor="249, 168, 94"
        fourthColor="252, 147, 75"
        fifthColor="255, 200, 145"
        pointerColor="244, 162, 89"
        size="80%"
        blendingValue="soft-light"
        interactive={false}
      />

      <main className="relative">
        {/* Overlay backdrop when alert is visible */}
        {alert && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-all duration-300"
            onClick={handleCloseAlert}
          />
        )}

        {/* Fixed Alert at top of page */}
        {alert && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top-4 duration-500">
            <Alert 
              variant={alert.type} 
              appearance="light" 
              close 
              onClose={handleCloseAlert}
              className="shadow-2xl border-2 backdrop-blur-md"
            >
              <AlertIcon>
                {alert.type === "success" ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <AlertCircle className="size-5" />
                )}
              </AlertIcon>
              <AlertTitle className="font-semibold">{alert.message}</AlertTitle>
            </Alert>
          </div>
        )}

        {/* Circular Care Hero Section - 400px, doesn't collide with navbar */}
        <section className="pt-28 pb-16 flex flex-col items-center justify-center px-4 min-h-[600px]">
          <CircularRevealHeading
            items={circularItems}
            size="md"
            centerText={
              <div className="text-2xl font-bold bg-gradient-to-br from-orange-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                CARE
              </div>
            }
            onCenterClick={scrollToContent}
          />
        </section>

        {/* Main Content Section - Original Card Styling */}
        <section ref={contentSectionRef} className="relative px-4 pb-24 scroll-mt-20">
          <div className="container mx-auto">
            <div className="care-grid">
              
              {/* DONATE CARD - Original Style */}
              <div className="care-card visible">
                <h2>Donate for a cause</h2>
                <p>
                  Your generous donation helps shelters and NGOs continue their vital work
                  in rescuing, rehabilitating, and rehoming animals in need.
                  Every contribution, big or small, makes a meaningful difference in an animal's life.
                </p>

                <a href="#" className="btn-primary">
                  Donate now
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>

              {/* REPORT INCIDENT CARD - Original Style */}
              <div className="care-card">
                <h2>Report Animal Suffering</h2>
                <p>
                  If you've witnessed animal abuse, neglect, or any concerning situation involving
                  an adopted pet, please report it immediately. Your report helps us ensure the safety
                  and well-being of all animals.
                </p>

                <ReportIncidentForm onAlert={setAlert} />
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}