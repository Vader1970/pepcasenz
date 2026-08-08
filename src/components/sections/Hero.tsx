"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/layout/Container";
import { ContactButton } from "@/components/ui/ContactButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { prefersReducedMotion } from "@/lib/motion";

const HERO_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 56vw";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const section = sectionRef.current;
      if (!section) return;

      const textItems = section.querySelectorAll(
        "[data-hero-eyebrow], [data-hero-heading], [data-hero-paragraph], [data-hero-button]",
      );
      const image = section.querySelector("[data-hero-image]");

      const hidden = { autoAlpha: 0, y: 18, force3D: true };
      const visible = {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        force3D: true,
      };

      const tl = gsap.timeline({ delay: 0.08 });

      tl.fromTo(textItems, hidden, { ...visible, stagger: 0.14 });

      if (image) {
        tl.fromTo(image, hidden, { ...visible, duration: 1.35 }, 0.12);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-0 flex-1 flex-col bg-background"
      aria-labelledby="hero-heading"
    >
      <Container className="flex min-h-0 flex-1 flex-col py-4 sm:py-6 lg:py-8">
        <div className="grid min-h-0 flex-1 items-center gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-14">
          <div className="order-1 flex min-h-0 flex-col justify-center">
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

          <div
            data-hero-image
            className="hero-enter order-2 mx-auto flex min-h-0 w-full max-w-[520px] items-center justify-center overflow-hidden rounded-xl lg:mx-0 lg:max-w-none lg:justify-self-end"
          >
            <Image
              src="/images/pepcasenz-hero.webp"
              alt="PEP CASE NZ open storage case with custom blue foam vial slots"
              width={1600}
              height={1190}
              priority
              sizes={HERO_IMAGE_SIZES}
              quality={80}
              className="h-auto max-h-[min(38svh,320px)] w-full object-contain sm:max-h-[min(40svh,380px)] lg:max-h-[min(62svh,560px)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
