"use client";
import { FloofyVapourHero } from "@/components/ui/vapour-text-effect";
import { useDevice } from "@/hooks/useDevice";
import CircularGalleryMobile from "@/components/ui/circular-gallery-mobile";
import type { MobileGalleryItem } from "@/components/ui/circular-gallery-mobile";
import dynamic from "next/dynamic";
import { AdoptionStepsPopover } from "@/components/ui/adoption-steps-popover"
import { StatCard } from "@/components/ui/card-10";
import { ArrowUpRight } from "lucide-react";




const IntroAnimation = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false }
);

export default function Home() {
  const { isMobile } = useDevice();
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
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="w-full bg-transparent pt-30 md:pt-20">
        <div className="relative w-full min-h-[150px] md:min-h-[160px] flex items-center justify-center">
          <FloofyVapourHero />
        </div>
      </section>

      {/* AVAILABLE FOR ADOPTION */}
      <section className="relative w-full mt-0 md:mt-4">
  {/* Desktop title */}
  <h2 className="section-title text-center mb-12 hidden md:block">
    Available for <span>adoption</span>
  </h2>

  {/* Gallery (unchanged) */}
  <div className="relative h-[520px] md:h-[800px] overflow-visible">
    {!isMobile ? (
      <IntroAnimation />
    ) : (
      <div style={{ transform: "translateY(+2.25rem)" }}>
        <CircularGalleryMobile items={mobileItems} />
      </div>
    )}
  </div>

  {/* Mobile title */}
 <h2
  className="section-title text-center mt-0 mb-6 md:hidden"
  style={{ transform: "translateY(-19.5rem)" }}
>
  Available for <span>adoption</span>
</h2>

  <div
  className="mt-6 flex justify-center"
  style={{
    transform: isMobile ? "translateY(-19.5rem)" : "none",
    marginBottom: isMobile ? "-29.5rem" : "0",
  }}
>
  <AdoptionStepsPopover />
</div>
</section>


      {/* WHY ADOPTION IS BETTER THAN BUYING */}
      <section className="mt-16 md:mt-0">
  <div className="container">
    <h2 className="section-title">
      <span className="text-[#F4A259] font-bold">#ADOPT</span>
      <span className="!text-black font-semibold" style={{ color: '#000000' }}>, Don't Buy</span>
    </h2>
    <div className="adoption-tiles">
      {/* TILE 1 */}
      <div className="adoption-tile relative overflow-hidden group hover-shake">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1592487919110-542826ef2404?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="adoption-tile-content relative z-10 text-white">
          <h3>Save a life</h3>
          <p>
            Every adoption gives a homeless pet a second chance at happiness and a
            loving forever home.
          </p>
        </div>
      </div>

      {/* TILE 2 */}
     <div className="adoption-tile relative overflow-hidden group hover-shake">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="adoption-tile-content relative z-10 text-white">
          <h3>Support shelters</h3>
          <p>
            Your adoption helps shelters continue their mission of rescuing and
            caring for animals in need.
          </p>
        </div>
      </div>

      {/* TILE 3 */}
      <div className="adoption-tile relative overflow-hidden group hover-shake">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b)",
    }}
  />

  {/* Floofy orange gradient tone */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#F4A259]/40 via-[#F4A259]/20 to-transparent" />

  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/45" />

  {/* Content */}
  <div className="adoption-tile-content relative z-10 text-white">
    <h3>Save a life</h3>
    <p>
      Every adoption gives a homeless pet a second chance at happiness and a
      loving forever home.
    </p>
  </div>
</div>
    </div>
  </div>
</section>

      {/* WHY ADOPT THROUGH FLOOFY */}
     <section className="mt-16 md:mt-0">
  <div className="container">
    <h2 className="section-title">
      Why adopt through <span>Floofy</span>
    </h2>

    <div className="feature-cards">
      {/* CARD 1 */}
           <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4A259]/40">
        <div className="feature-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <h3>Healthier pets</h3>
        <p>
          All pets on our platform receive comprehensive health screenings and
          vaccinations before adoption.
        </p>
      </div>

      {/* CARD 2 */}
           <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4A259]/40">
        <div className="feature-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h3>Post-adoption care</h3>
        <p>
          We provide ongoing support, resources, and guidance to ensure a smooth
          transition for you and your new pet.
        </p>
      </div>

      {/* CARD 3 */}
          <div className="rounded-xl border border-[#F4A259]/20 bg-[#F4A259]/12 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4A259]/40">
        <div className="feature-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3>Community building</h3>
        <p>
          Join a passionate community of pet lovers, share experiences, and
          participate in adoption events.
        </p>
      </div>
    </div>
  </div>
</section>

     {/* STATS SECTION */}
{/* TRUSTED BY THOUSANDS */}
<section className="mt-16 md:mt-20">
  <div
    className="container"
    style={{
      transform: "translateY(-10rem)", 
    }}
  >
    <h2 className="section-title text-center mb-12">
      Trusted by <span>thousands</span> across India
    </h2>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* APP PREVIEW SECTION */}
   <section className="app-preview bg-transparent relative mt-16 md:mt-0 pb-0">
  <div
    className="container"
    style={{
      transform: "translateY(-10rem)",   
      marginBottom: "-10rem",           
    }}
  >
    <h2 className="section-title mb-0">
      Experience the <span>Floofy</span> app
    </h2>

    <div className="phone-mockups">
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

    <div className="flex justify-center mt-6 mb-0">
      <a href="#" className="store-btn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
        </svg>
        <div className="store-btn-text">
          <small>Download on the</small>
          <span>App Store</span>
        </div>
      </a>
    </div>
  </div>
</section>
    </main>
  );
}