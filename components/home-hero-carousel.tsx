"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/11062b-e16cb98fc41a4c128b1984d6352e9e3e-mv2-jpg-e32a764e9593.jpg",
    alt: "Wind Turbine Closeup",
    title: "Sustainability, ESG Advisory & Carbon Credit Services Consultants for Future-Ready Organizations",
    description: "Empowering enterprises to integrate sustainability into core business strategy, compliance, and long-term value creation.",
    variant: "lead",
  },
  {
    image: "/assets/home-hero-carbon-emissions.jpg",
    alt: "Solar Panel Installation",
    title: "Carbon Emissions Measurement",
    description: "Accurate Scope 1, 2 & 3 quantification with reduction pathways and reporting support.",
    variant: "carbon",
  },
  {
    image: "/assets/home-hero-climate-risk.jpg",
    alt: "Handful Of Recycled Material",
    title: "Climate Risk Assessments",
    description: "Identifying physical and transition risks to enhance resilience and regulatory alignment.",
    variant: "climate",
  },
] as const;

export function HomeHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

  function move(direction: -1 | 1) {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section
      className="home-hero"
      aria-roledescription="carousel"
      aria-label="Sustaind services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="home-hero__slides" aria-live="polite">
        {slides.map((slide, index) => {
          const position = index === activeSlide ? "is-active" : index === (activeSlide + 1) % slides.length ? "is-next" : "is-previous";
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <article
              className={`home-hero__slide ${position}`}
              aria-hidden={index !== activeSlide}
              aria-label={`${index + 1} of ${slides.length}`}
              key={slide.title}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className={`home-hero__content home-hero__content--${slide.variant}`}>
                <Heading>{slide.title}</Heading>
                <p>{slide.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <button className="home-hero__arrow home-hero__arrow--previous" type="button" aria-label="Previous hero slide" onClick={() => move(-1)}>
        <span aria-hidden="true" />
      </button>
      <button className="home-hero__arrow home-hero__arrow--next" type="button" aria-label="Next hero slide" onClick={() => move(1)}>
        <span aria-hidden="true" />
      </button>
    </section>
  );
}
