"use client";
import { FloofyVapourHero } from "@/components/ui/vapour-text-effect";
import { useDevice } from "@/hooks/useDevice";
import CircularGalleryMobile from "@/components/ui/circular-gallery-mobile";
import dynamic from "next/dynamic";
import { AdoptionStepsPopover } from "@/components/ui/adoption-steps-popover";
import { StatCard } from "@/components/ui/card-10";
import { ArrowUpRight } from "lucide-react";
import { FloofyPremiumCarousel } from "@/components/ui/floofy-premium-carousel";
import { useRef, useState, useEffect } from "react";


const IntroAnimation = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false }
);

export default function Home() {
  const { isMobile } = useDevice();
  const [showAppAlert, setShowAppAlert] = useState(false);
const appDownloadRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handler = () => setShowAppAlert(true);

  window.addEventListener("floofy-open-app-alert", handler);
  return () => window.removeEventListener("floofy-open-app-alert", handler);
}, []);

  
  const mobileItems = [
    {
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      breed: "Golden Retriever",
      age: "2 years",
    },
    {
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      breed: "Beagle",
      age: "1.5 years",
    },
    {
      image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9",
      breed: "Indie",
      age: "3 years",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ========================================
          HERO SECTION - Optimized spacing
      ======================================== */}
      <section className="w-full bg-transparent pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="relative w-full min-h-[150px] md:min-h-[160px] flex items-center justify-center">
          <FloofyVapourHero />
        </div>
      </section>

      {/* ========================================
          AVAILABLE FOR ADOPTION - PREMIUM CAROUSEL
      ======================================== */}
      <section className="relative w-full py-8 md:py-16">
        <div className="container">
          {/* Desktop title */}
          <h2 className="section-title text-center mb-8 md:mb-12 hidden md:block">
            Available for <span>adoption</span>
          </h2>

          {/* Gallery Container */}
            {!isMobile ? (
              // ✅ Desktop: New Premium Floofy carousel
              <FloofyPremiumCarousel />
            ) : (
              // ✅ Mobile: Circular gallery (unchanged)
              <div className="w-full py-8">
                <CircularGalleryMobile items={mobileItems} />
              </div>
            )}
          

          {/* Mobile title */}
          <h2 className="section-title text-center mt-8 mb-6 md:hidden">
            Available for <span>adoption</span>
          </h2>

          {/* Adoption Steps Button */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <AdoptionStepsPopover />
          </div>
        </div>
      </section>

      {/* ========================================
          #ADOPT DON'T BUY - Perfect spacing
      ======================================== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="section-title text-center mb-8 md:mb-12">
            <span className="text-[#F4A259] font-bold">#ADOPT</span>
            <span className="!text-black font-semibold" style={{ color: '#000000' }}>, Don't Buy</span>
          </h2>
          
          <div className="adoption-tiles">
            {/* TILE 1 - Save a life */}
            <div className="adoption-tile relative overflow-hidden group hover-shake">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1592487919110-542826ef2404?q=80&w=1170&auto=format&fit=crop)",
                }}
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="adoption-tile-content relative z-10 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Save a life</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Every adoption gives a homeless pet a second chance at happiness and a
                  loving forever home.
                </p>
              </div>
            </div>

            {/* TILE 2 - Support shelters */}
            <div className="adoption-tile relative overflow-hidden group hover-shake">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop)",
                }}
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="adoption-tile-content relative z-10 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Support shelters</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Your adoption helps shelters continue their mission of rescuing and
                  caring for animals in need.
                </p>
              </div>
            </div>

            {/* TILE 3 - Fight puppy mills */}
            <div className="adoption-tile relative overflow-hidden group hover-shake">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#F4A259]/40 via-[#F4A259]/20 to-transparent" />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300" />
              <div className="adoption-tile-content relative z-10 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Fight puppy mills</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Choosing adoption over buying helps combat unethical breeding
                  practices and animal cruelty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          WHY ADOPT THROUGH FLOOFY - Balanced spacing
      ======================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent to-[#F4A259]/5">
        <div className="container">
          <h2 className="section-title text-center mb-10 md:mb-16">
            Why adopt through <span>Floofy</span>
          </h2>

          <div className="feature-cards">
            {/* CARD 1 - Healthier pets */}
            <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#F4A259]/40 hover:bg-[#F4A259]/15">
              <div className="feature-icon mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Healthier pets</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                All pets on our platform receive comprehensive health screenings and
                vaccinations before adoption.
              </p>
            </div>

            {/* CARD 2 - Post-adoption care */}
            <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#F4A259]/40 hover:bg-[#F4A259]/15">
              <div className="feature-icon mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Post-adoption care</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                We provide ongoing support, resources, and guidance to ensure a smooth
                transition for you and your new pet.
              </p>
            </div>

            {/* CARD 3 - Community building */}
            <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#F4A259]/40 hover:bg-[#F4A259]/15">
              <div className="feature-icon mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Community building</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Join a passionate community of pet lovers, share experiences, and
                participate in adoption events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          TRUSTED BY THOUSANDS - Stats with proper spacing
      ======================================== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="section-title text-center mb-10 md:mb-16">
            Trusted by <span>thousands</span> across India
          </h2>

          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <StatCard
              title="Verified shelters"
              value={120}
              change={18}
              changeDescription="last year"
              icon={<ArrowUpRight className="h-4 w-4 text-green-600" />}
            />

            <StatCard
              title="Successful adoptions"
              value={4800}
              change={24}
              changeDescription="last year"
              icon={<ArrowUpRight className="h-4 w-4 text-green-600" />}
            />

            <StatCard
              title="Satisfaction rate"
              value={98.7}
              suffix="%"
              change={1.2}
              changeDescription="last year"
              icon={<ArrowUpRight className="h-4 w-4 text-green-600" />}
            />
          </div>
        </div>
      </section>

      {/* ========================================
          APP PREVIEW - Bottom section with perfect spacing
      ======================================== */}
      <section 
        ref={appDownloadRef}
        className="py-16 md:py-24 bg-gradient-to-b from-[#F4A259]/5 to-transparent"
      >
        <div className="container">
          <h2 className="section-title text-center mb-10 md:mb-16">
            Experience the <span>Floofy</span> app
          </h2>

          <div className="phone-mockups mb-8 md:mb-12">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">Browse Pets</div>
                <div className="phone-content">
                  <div className="phone-content-block wide"></div>
                  <div className="phone-content-block small"></div>
                  <div className="phone-content-block"></div>
                  <div className="phone-content-block wide"></div>
                  <div className="phone-content-block"></div>
                </div>
              </div>
            </div>

            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">Pet Profile</div>
                <div className="phone-content">
                  <div className="phone-content-block wide"></div>
                  <div className="phone-content-block small"></div>
                  <div className="phone-content-block"></div>
                  <div className="phone-content-block"></div>
                  <div className="phone-content-block small"></div>
                </div>
              </div>
            </div>

            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">Adoption</div>
                <div className="phone-content">
                  <div className="phone-content-block"></div>
                  <div className="phone-content-block"></div>
                  <div className="phone-content-block wide"></div>
                  <div className="phone-content-block small"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            {/* App Store Button */}
            <a 
              href="https://apps.apple.com/in/app/floofy/id6749371157"
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="store-btn-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.floofy.app"
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="store-btn-text">
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom padding for breathing room */}
      <div className="h-16 md:h-24"></div>
      {showAppAlert && (
  <div className="fixed inset-0 z-50">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowAppAlert(false)}
    />

    <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">
        <h3 className="text-xl font-bold mb-2">
          Explore on the Floofy App 🐾
        </h3>

        <p className="text-gray-600 mb-6">
          Full pet profiles, multiple photos, and adoption details are available on the Floofy app.
        </p>

        <button
          onClick={() => {
            setShowAppAlert(false);
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }, 150);
          }}
          className="w-full rounded-xl bg-[#F4A259] text-white py-3 font-semibold hover:opacity-90 transition"
        >
          Got it, show me
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}