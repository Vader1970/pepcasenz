"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/layout/Container";
import { ContactButton } from "@/components/ui/ContactButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { prefersReducedMotion } from "@/lib/motion";

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
      className="bg-background py-14 md:py-20 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="grid min-h-0 items-center gap-10 lg:min-h-[520px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          <div className="order-1 flex flex-col">
            <div data-hero-eyebrow className="hero-enter">
              <SectionEyebrow>PREMIUM VIAL STORAGE</SectionEyebrow>
            </div>

            <h1
              id="hero-heading"
              data-hero-heading
              className="hero-enter mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-foreground"
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
              className="hero-enter mt-6 max-w-[430px] text-base leading-[1.65] text-muted md:mt-7 md:text-[17px]"
            >
              Keep your peptide and medication vials organised, protected, and
              always within reach — at home or on the go.
            </p>

            <div data-hero-button className="hero-enter mt-7 md:mt-8">
              <ContactButton />
            </div>
          </div>

          <div
            data-hero-image
            className="hero-enter order-2 mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none lg:justify-self-end"
          >
            <Image
              src="/images/hero.png"
              alt="PEP CASE NZ open storage case with custom blue foam vial slots"
              width={1024}
              height={768}
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
