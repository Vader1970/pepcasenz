import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HeroCopy } from "@/components/sections/HeroCopy";
import heroImage from "../../../public/images/pepcasenz-hero.webp";

const HERO_IMAGE_SIZES =
  "(max-width: 640px) 365px, (max-width: 1024px) 480px, 640px";

export function Hero() {
  return (
    <section
      className="flex min-h-0 flex-1 flex-col bg-background"
      aria-labelledby="hero-heading"
    >
      <Container className="flex min-h-0 flex-1 flex-col py-4 sm:py-6 lg:py-8">
        <div className="grid min-h-0 flex-1 items-center gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-14">
          <HeroCopy />

          <div className="order-2 mx-auto flex min-h-0 w-full max-w-[520px] items-center justify-center overflow-hidden rounded-xl lg:mx-0 lg:max-w-none lg:justify-self-end">
            <Image
              src={heroImage}
              alt="PEP CASE NZ open storage case with custom blue foam vial slots"
              preload
              sizes={HERO_IMAGE_SIZES}
              quality={75}
              className="h-auto max-h-[min(38svh,320px)] w-full object-contain sm:max-h-[min(40svh,380px)] lg:max-h-[min(62svh,560px)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
