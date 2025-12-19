"use client";

import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { FloofyVapourHero } from "@/components/ui/vapour-text-effect";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
    <div
  className="w-full"
  style={{
    background: `
      radial-gradient(
        600px 140px at 50% 0%,
        rgba(244, 162, 89, 0.08),
        rgba(244, 162, 89, 0.04),
        transparent 70%
      )
    `,
  }}
>
  <div className="w-full relative">
  <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-visible">
  <FloofyVapourHero />
</div>
</div>
  <IntroAnimation />
</div>

      {/* AVAILABLE FOR ADOPTION — hero replaces old carousel */}
      <section id="available">
        <div className="container">
          <h2 className="section-title">
            Available for <span>adoption</span>
          </h2>

          {/* This box is where the old carousel was. Now it holds the scroll-morph hero. */}
          <div className="w-full h-[800px] border border-border rounded-2xl overflow-hidden relative bg-card">
            <IntroAnimation />
          </div>
        </div>
      </section>

      {/* WHY ADOPTION IS BETTER THAN BUYING */}
      <section>
        <div className="container">
          <h2 className="section-title">
            Why adoption is <span>better</span> than buying
          </h2>
          <div className="adoption-tiles">
            <div className="adoption-tile">
              <div
                className="adoption-tile-bg"
                style={{
                  background:
                    "linear-gradient(135deg, #4a3f35 0%, #2d2620 100%)",
                }}
              ></div>
              <div className="adoption-tile-content">
                <h3>Save a life</h3>
                <p>
                  Every adoption gives a homeless pet a second chance at happiness and a
                  loving forever home.
                </p>
              </div>
            </div>
            <div className="adoption-tile">
              <div
                className="adoption-tile-bg"
                style={{
                  background:
                    "linear-gradient(135deg, #5c4d40 0%, #3d332b 100%)",
                }}
              ></div>
              <div className="adoption-tile-content">
                <h3>Support shelters</h3>
                <p>
                  Your adoption helps shelters continue their mission of rescuing and
                  caring for animals in need.
                </p>
              </div>
            </div>
            <div className="adoption-tile">
              <div
                className="adoption-tile-bg"
                style={{
                  background:
                    "linear-gradient(135deg, #6e5c4a 0%, #4a3f35 100%)",
                }}
              ></div>
              <div className="adoption-tile-content">
                <h3>Say no to puppy mills</h3>
                <p>
                  By adopting, you&apos;re taking a stand against unethical breeding
                  practices and animal exploitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ADOPT THROUGH FLOOFY */}
      <section>
        <div className="container">
          <h2 className="section-title">
            Why adopt through <span>Floofy</span>
          </h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3>Healthier pets</h3>
              <p>
                All pets on our platform receive comprehensive health screenings and
                vaccinations before adoption.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3>Post-adoption care</h3>
              <p>
                We provide ongoing support, resources, and guidance to ensure a smooth
                transition for you and your new pet.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
<section className="stats-section py-20">
  <div className="container">
    <h2 className="section-title text-center mb-12">
      Trusted by <span>thousands</span> across India
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

      {/* Stat 1 */}
      <div className="stat-card">
        <div className="stat-number text-5xl font-bold tracking-tight mb-2">
          120+
        </div>
        <p className="text-lg font-medium text-gray-600">
          Verified Shelters
        </p>
      </div>

      {/* Stat 2 */}
      <div className="stat-card">
        <div className="stat-number text-5xl font-bold tracking-tight mb-2">
          4,800+
        </div>
        <p className="text-lg font-medium text-gray-600">
          Successful Adoptions
        </p>
      </div>

      {/* Stat 3 */}
      <div className="stat-card">
        <div className="stat-number text-5xl font-bold tracking-tight mb-2">
          98.7%
        </div>
        <p className="text-lg font-medium text-gray-600">
          Satisfaction Rate
        </p>
      </div>

    </div>
  </div>
</section>

      {/* APP PREVIEW SECTION */}
      <section className="app-preview">
        <div className="container">
          <h2 className="section-title">
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
          {/* Store buttons (you can wire these later) */}
          <br></br>
          <br></br>
          <center>
            <a href="#" className="store-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="store-btn-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
          </center>
          <div className="store-buttons">

            
          </div>
        </div>
      </section>

      

      {/* Footer is in layout or global, so we don’t duplicate it here */}
    </main>
  );
}
