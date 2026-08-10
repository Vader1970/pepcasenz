"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ContactButton } from "@/components/ui/ContactButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { prefersReducedMotion } from "@/lib/motion";

export function HeroCopy() {
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const root = copyRef.current;
      if (!root) return;

      const textItems = root.querySelectorAll(
        "[data-hero-eyebrow], [data-hero-heading], [data-hero-paragraph], [data-hero-button]",
      );

      gsap
        .timeline({ delay: 0.06 })
        .fromTo(
          textItems,
          { autoAlpha: 0, y: 12, force3D: true },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            force3D: true,
            clearProps: "transform",
          },
        );
    },
    { scope: copyRef },
  );

  return (
    <div ref={copyRef} className="order-1 flex min-h-0 flex-col justify-center">
      <div data-hero-eyebrow className="hero-enter">
        <SectionEyebrow>PREMIUM VIAL STORAGE</SectionEyebrow>
      </div>

      <h1
        id="hero-heading"
        data-hero-heading
        className="hero-enter mt-3 text-[clamp(1.75rem,4.2vh+0.85rem,4.5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-foreground sm:mt-4 lg:mt-5"
      >
        Organised.
        <br />
        Protected.
        <br />
        Always Ready
        <span className="text-accent">.</span>
      </h1>

      <p
        data-hero-paragraph
        className="hero-enter mt-3 max-w-[430px] text-[0.95rem] leading-[1.55] text-muted sm:mt-4 sm:text-base sm:leading-[1.65] md:mt-5 md:text-[17px] lg:mt-6"
      >
        Keep your peptide and medication vials organised, protected, and always within reach - whether you&apos;re at home or on the go.
      </p>

      <div data-hero-button className="hero-enter mt-4 sm:mt-5 md:mt-6 lg:mt-7">
        <ContactButton />
      </div>
    </div>
  );
}
