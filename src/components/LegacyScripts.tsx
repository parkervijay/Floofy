// @ts-nocheck
"use client";

import { useEffect } from "react";

const PETS_API_URL = "https://api.example.com/pets";

const samplePets = [
  { photoUrl: "", name: "Bella", age: "2 years", breed: "Golden Retriever", isAvailable: true },
  { photoUrl: "", name: "Max", age: "1 year", breed: "Labrador", isAvailable: true },
  { photoUrl: "", name: "Luna", age: "3 years", breed: "German Shepherd", isAvailable: false },
  { photoUrl: "", name: "Charlie", age: "6 months", breed: "Beagle", isAvailable: true },
  { photoUrl: "", name: "Daisy", age: "4 years", breed: "Bulldog", isAvailable: true },
  { photoUrl: "", name: "Rocky", age: "2 years", breed: "Husky", isAvailable: false },
  { photoUrl: "", name: "Milo", age: "1 year", breed: "Poodle", isAvailable: true },
  { photoUrl: "", name: "Sadie", age: "5 years", breed: "Boxer", isAvailable: true },
];

export default function LegacyScripts() {
  useEffect(() => {
    // ------- helpers: read browser state safely -------
    if (typeof window === "undefined" || typeof document === "undefined") return;
    
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouchDevice =
      "ontouchstart" in window || 
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);

    // ------- original script.js logic, adapted -------

    function initLoader() {
      const loader = document.querySelector(".page-loader");
      if (loader) {
        const delay = prefersReducedMotion ? 100 : 400;
        setTimeout(() => {
          loader.classList.add("hidden");
          animatePageContent();
        }, delay);
      } else {
        animatePageContent();
      }
    }

    function animatePageContent() {
      const animatedElements = document.querySelectorAll(".hero-content, .page-header");

      if (prefersReducedMotion) {
        animatedElements.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
        return;
      }

      animatedElements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "translateY(30px)";
        setTimeout(() => {
          (el as HTMLElement).style.transition = "opacity 0.8s ease, transform 0.8s ease";
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0)";
        }, index * 150);
      });
    }

    function initCursor() {
      if (isTouchDevice || prefersReducedMotion) {
        document.body.classList.add("no-custom-cursor");
        return;
      }

      document.body.classList.add("has-custom-cursor");

      const cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      cursor.innerHTML = '<div class="cursor-paw"></div>';
      document.body.appendChild(cursor);

      let mouseX = 0,
        mouseY = 0;
      let cursorX = 0,
        cursorY = 0;
      let lastTrailTime = 0;
      let lastParticleTime = 0;
      let isVisible = true;
      let animationFrameId: number | null = null;

      function createTrailDot(x: number, y: number) {
        if (prefersReducedMotion) return;

        const trail = document.createElement("div");
        trail.className = "cursor-trail";
        trail.style.left = x + "px";
        trail.style.top = y + "px";
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 800);
      }

      function createParticle(x: number, y: number) {
        if (prefersReducedMotion) return;

        const particle = document.createElement("div");
        particle.className = "cursor-particle";
        const size = Math.random() * 12 + 8;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = x + (Math.random() - 0.5) * 20 + "px";
        particle.style.top = y + (Math.random() - 0.5) * 20 + "px";
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
      }

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
        isVisible = true;

        const now = performance.now();

        if (now - lastTrailTime > 40) {
          createTrailDot(mouseX, mouseY);
          lastTrailTime = now;
        }

        if (now - lastParticleTime > 250) {
          createParticle(mouseX, mouseY);
          lastParticleTime = now;
        }
      };

      const handleMouseLeave = () => {
        cursor.style.opacity = "0";
        isVisible = false;
      };

      function animateCursor() {
        if (!isVisible) {
          animationFrameId = null;
          return;
        }

        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;

        animationFrameId = requestAnimationFrame(animateCursor);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      animateCursor();

      // Return cleanup function
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
      };
    }

    function initMobileMenu() {
      const menuBtn = document.querySelector(".mobile-menu-btn") as HTMLElement | null;
      const navLinks = document.querySelector(".nav-links") as HTMLElement | null;

      if (menuBtn && navLinks) {
        const handleMenuClick = () => {
          navLinks.classList.toggle("active");
        };
        
        const handleDocumentClick = (e: Event) => {
          const target = e.target as Node;
          if (!menuBtn.contains(target) && !navLinks.contains(target)) {
            navLinks.classList.remove("active");
          }
        };

        menuBtn.addEventListener("click", handleMenuClick);
        document.addEventListener("click", handleDocumentClick);

        // Return cleanup function
        return () => {
          menuBtn.removeEventListener("click", handleMenuClick);
          document.removeEventListener("click", handleDocumentClick);
        };
      }
      return () => {};
    }

    function initScrollAnimations() {
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0) scale(1)";
            }
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const animatedElements = document.querySelectorAll(
        ".pet-card, .adoption-tile, .feature-card, .resource-card, .care-card, .phone-mockup"
      );

      animatedElements.forEach((el, index) => {
        const delay = Math.min(index * 0.08, 0.5);
        (el as HTMLElement).style.transitionDelay = `${delay}s`;
        observer.observe(el);
      });
    }

    async function initPetsCarousel() {
      const carousel = document.querySelector(".pets-carousel");
      if (!carousel) return;

      let pets = samplePets;

      try {
        const response = await fetch(PETS_API_URL);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            pets = data;
          }
        }
      } catch (error) {
        console.log("Using sample pet data");
      }

      renderPets(carousel as HTMLElement, pets);
      initCarouselNavigation();
    }

    function renderPets(container: HTMLElement, pets: any[]) {
      container.innerHTML = pets
        .map(
          (pet, index) => `
        <div class="pet-card" style="transition-delay: ${index * 0.1}s">
          <div class="pet-card-image">
            ${
              pet.photoUrl
                ? `<img src="${pet.photoUrl}" alt="${pet.name}">`
                : `<svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="32" cy="45" rx="14" ry="12" fill="#d4d0cb"/>
                    <ellipse cx="18" cy="28" rx="7" ry="8" fill="#d4d0cb"/>
                    <ellipse cx="46" cy="28" rx="7" ry="8" fill="#d4d0cb"/>
                    <ellipse cx="25" cy="18" rx="5" ry="6" fill="#d4d0cb"/>
                    <ellipse cx="39" cy="18" rx="5" ry="6" fill="#d4d0cb"/>
                  </svg>`
            }
          </div>
          <div class="pet-card-content">
            <h3>${pet.name}</h3>
            <p class="pet-card-info">${pet.age} · ${pet.breed}</p>
            <span class="pet-status ${pet.isAvailable ? "available" : "unavailable"}">
              ${pet.isAvailable ? "Available right now" : "Not available"}
            </span>
          </div>
        </div>
      `
        )
        .join("");

      setTimeout(() => {
        container.querySelectorAll(".pet-card").forEach((card) => {
          card.classList.add("visible");
        });
      }, 300);
    }

    function initCarouselNavigation() {
      const carousel = document.querySelector(".pets-carousel") as HTMLElement | null;
      const prevBtn = document.querySelector(".carousel-btn.prev") as HTMLElement | null;
      const nextBtn = document.querySelector(".carousel-btn.next") as HTMLElement | null;
      const dots = document.querySelectorAll(".carousel-dot");

      if (!carousel || !prevBtn || !nextBtn || dots.length === 0) return () => {};

      const cardWidth = 280 + 24; // width + gap (from your CSS)
      let currentIndex = 0;

      function updateCarousel(index: number) {
        currentIndex = Math.max(0, Math.min(index, dots.length - 1));
        carousel.scrollTo({
          left: currentIndex * cardWidth,
          behavior: "smooth",
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
        });
      }

      const handlePrevClick = () => {
        updateCarousel(currentIndex - 1);
      };

      const handleNextClick = () => {
        updateCarousel(currentIndex + 1);
      };

      const dotHandlers: Array<() => void> = [];
      dots.forEach((dot, i) => {
        const handleDotClick = () => {
          updateCarousel(i);
        };
        dot.addEventListener("click", handleDotClick);
        dotHandlers.push(handleDotClick);
      });

      prevBtn.addEventListener("click", handlePrevClick);
      nextBtn.addEventListener("click", handleNextClick);

      // Return cleanup function
      return () => {
        prevBtn.removeEventListener("click", handlePrevClick);
        nextBtn.removeEventListener("click", handleNextClick);
        dots.forEach((dot, i) => {
          dot.removeEventListener("click", dotHandlers[i]);
        });
      };
    }

    function initIncidentForm() {
      const form = document.getElementById("incident-form") as HTMLFormElement | null;
      const successMessage = document.querySelector(".success-message") as HTMLElement | null;

      if (!form || !successMessage) return () => {};

      let timeoutId: NodeJS.Timeout | null = null;

      const handleSubmit = (e: Event) => {
        e.preventDefault();

        // Clear any existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (prefersReducedMotion) {
          successMessage.classList.add("show");
          form.reset();
          return;
        }

        successMessage.classList.remove("show");

        timeoutId = setTimeout(() => {
          successMessage.classList.add("show");
          form.reset();
          timeoutId = null;
        }, 150);
      };

      form.addEventListener("submit", handleSubmit);

      // Return cleanup function
      return () => {
        form.removeEventListener("submit", handleSubmit);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      };
    }
    // ------- Scroll reveal elements -------
    const revealTargets = document.querySelectorAll(
      ".pet-card, .adoption-tile, .feature-card, .resource-card, .care-card, .phone-mockup"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    // ---- run everything once on mount ----
    initLoader();
    const cursorCleanup = initCursor();
    const menuCleanup = initMobileMenu();
    initScrollAnimations();
    initPetsCarousel();
    const formCleanup = initIncidentForm();

    // Cleanup all listeners and observers
    return () => {
      if (cursorCleanup) cursorCleanup();
      if (menuCleanup) menuCleanup();
      if (formCleanup) formCleanup();
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
