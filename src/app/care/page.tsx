"use client";

import { useState, useEffect } from "react";
import { ReportIncidentForm } from "@/components/care/ReportIncidentForm";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert-1";
import { CheckCircle2, AlertCircle } from "lucide-react";

type AlertType = "success" | "destructive";

export default function CarePage() {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  // Lock scroll when alert is visible
  useEffect(() => {
    if (alert) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Unlock scroll and restore position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [alert]);

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <main>
      {/* Overlay backdrop when alert is visible */}
      {alert && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={handleCloseAlert}
        />
      )}

      {/* Fixed Alert at top of page */}
      {alert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top duration-300">
          <Alert 
            variant={alert.type} 
            appearance="light" 
            close 
            onClose={handleCloseAlert}
            className="shadow-lg"
          >
            <AlertIcon>
              {alert.type === "success" ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <AlertCircle className="size-5" />
              )}
            </AlertIcon>
            <AlertTitle>{alert.message}</AlertTitle>
          </Alert>
        </div>
      )}

      {/* Page header */}
      <header className="page-header">
        <div className="container">
          <h1>Care</h1>
          <p>
            Support our mission and help us create a safer, more loving world for all animals.
          </p>
        </div>
      </header>

      {/* Main content */}
      <section>
        <div className="container">
          <div className="care-grid">
            
            {/* DONATE CARD */}
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

            {/* REPORT INCIDENT CARD */}
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
  );
}