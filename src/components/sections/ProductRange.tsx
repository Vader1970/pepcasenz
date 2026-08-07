"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ShoppingBagIcon } from "@/components/ui/icons";
import { productRange } from "@/data/productRange";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function ProductRange() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const header = sectionRef.current?.querySelector("[data-range-header]");
      const cards = sectionRef.current?.querySelectorAll("[data-range-card]");

      if (header) {
        gsap.from(header, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (cards?.length) {
        gsap.from(cards, {
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
      className="bg-background py-14 md:py-20 lg:py-24"
      aria-labelledby="range-heading"
    >
      <Container>
        <div data-range-header className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>THE RANGE</SectionEyebrow>
          <h2
            id="range-heading"
            className="mt-5 text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.025em] text-foreground"
          >
            Product Range
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted">
            Explore our storage options and everyday carry solutions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {productRange.map((product) => (
            <article
              key={product.title}
              data-range-card
              className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e8e8e8] bg-background shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={1024}
                  height={1024}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-[7px] bg-[#f5f5f5] text-foreground">
                  <ShoppingBagIcon />
                </div>
                <h3 className="text-lg font-semibold leading-[1.3] text-foreground">
                  {product.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
