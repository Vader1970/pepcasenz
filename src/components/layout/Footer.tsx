"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { ContactButton } from "@/components/ui/ContactButton";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="bg-background pt-16 pb-10 md:pt-20 md:pb-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-[1.65] text-muted">
              Premium storage solutions for your peptides and medications.
              Built for security. Designed for life.
            </p>
          </div>

          <div className="md:text-right">
            <h2 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-foreground">
              Have questions or need assistance?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted">
              We&apos;d love to hear from you.
            </p>
            <div className="mt-6 md:flex md:justify-end">
              <ContactButton />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border-light pt-8 md:mt-16">
          <p className="text-xs text-muted">
            © 2026 PEP CASE NZ. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
