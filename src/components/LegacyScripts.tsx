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
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

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

      document.addEventListener("mousemove", (e) => {
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
      });

      document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        isVisible = false;
      });

      function animateCursor() {
        if (!isVisible) return;

        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;

        requestAnimationFrame(animateCursor);
      }

      animateCursor();
    }

    function initMobileMenu() {
      const menuBtn = document.querySelector(".mobile-menu-btn") as HTMLElement | null;
      const navLinks = document.querySelector(".nav-links") as HTMLElement | null;

      if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
          const target = e.target as Node;
          if (!menuBtn.contains(target) && !navLinks.contains(target)) {
            navLinks.classList.remove("active");
          }
        });
      }
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

      if (!carousel || !prevBtn || !nextBtn || dots.length === 0) return;

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

      prevBtn.addEventListener("click", () => {
        updateCarousel(currentIndex - 1);
      });

      nextBtn.addEventListener("click", () => {
        updateCarousel(currentIndex + 1);
      });

      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          updateCarousel(i);
        });
      });
    }

    function initIncidentForm() {
      const form = document.getElementById("incident-form") as HTMLFormElement | null;
      const successMessage = document.querySelector(".success-message") as HTMLElement | null;

      if (!form || !successMessage) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (prefersReducedMotion) {
          successMessage.classList.add("show");
          form.reset();
          return;
        }

        successMessage.classList.remove("show");

        setTimeout(() => {
          successMessage.classList.add("show");
          form.reset();
        }, 150);
      });
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
    initCursor();
    initMobileMenu();
    initScrollAnimations();
    initPetsCarousel();
    initIncidentForm();

    // no cleanup for now (OK for this simple site)
  }, []);

  return null;
}
