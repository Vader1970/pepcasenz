"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AirplaneIcon, BoxIcon, ShieldIcon } from "@/components/ui/icons";
import { benefits } from "@/data/features";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function BenefitIcon({ name }: { name: "shield" | "box" | "airplane" }) {
  switch (name) {
    case "shield":
      return <ShieldIcon />;
    case "box":
      return <BoxIcon />;
    case "airplane":
      return <AirplaneIcon />;
  }
}

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const intro = sectionRef.current?.querySelector("[data-benefits-intro]");
      const items = sectionRef.current?.querySelectorAll("[data-benefit-item]");

      if (intro) {
        gsap.from(intro, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (items?.length) {
        gsap.from(items, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-background-soft py-14 md:py-20 lg:py-24"
      aria-labelledby="benefits-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,1.35fr)_repeat(3,minmax(180px,1fr))] lg:gap-0 xl:gap-4">
          <div data-benefits-intro className="lg:pr-10 xl:pr-16">
            <SectionEyebrow>BUILT FOR PEACE OF MIND</SectionEyebrow>
            <h2
              id="benefits-heading"
              className="mt-5 text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.025em] text-foreground"
            >
              Designed for
              <br />
              Safety &amp; Simplicity
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-muted">
              Designed around the way you actually store and carry your supplies, with practical details that make everything easier to keep together.
            </p>
          </div>

          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              data-benefit-item
              className={`flex flex-col py-2 lg:border-l lg:border-[#dddddd] lg:px-8 xl:px-10 ${index > 0
                ? "border-t border-[#dddddd] pt-8 lg:border-t-0 lg:pt-2"
                : ""
                }`}
            >
              <BenefitIcon name={benefit.icon} />
              <h3 className="mt-5 text-lg font-semibold leading-[1.3] text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
