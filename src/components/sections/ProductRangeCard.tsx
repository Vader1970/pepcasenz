"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingBagIcon } from "@/components/ui/icons";
import { ProductImageLightbox } from "@/components/ui/ProductImageLightbox";
import type { ProductRangeItem } from "@/data/productRange";
import { usePrefersReducedMotion } from "@/lib/motion";

interface ProductRangeCardProps {
  product: ProductRangeItem;
}

const TRANSITION_MS = 2000;
const HOLD_MS = 1000;
const CYCLE_MS = TRANSITION_MS + HOLD_MS;

interface SlideState {
  index: number;
  prevIndex: number;
  hasCycled: boolean;
}

const INITIAL_SLIDE: SlideState = {
  index: 0,
  prevIndex: 0,
  hasCycled: false,
};

export function ProductRangeCard({ product }: ProductRangeCardProps) {
  const [hovered, setHovered] = useState(false);
  const [extrasReady, setExtrasReady] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slide, setSlide] = useState<SlideState>(INITIAL_SLIDE);
  const timersRef = useRef<{
    start?: number;
    interval?: number;
    paint?: number;
  }>({});
  const reduceMotion = usePrefersReducedMotion();
  const imageCount = product.images.length;
  const visibleImages = extrasReady ? product.images : product.images.slice(0, 1);

  useEffect(() => {
    const timers = timersRef.current;

    const clearTimers = () => {
      if (timers.start !== undefined) window.clearTimeout(timers.start);
      if (timers.interval !== undefined) window.clearInterval(timers.interval);
      if (timers.paint !== undefined) window.cancelAnimationFrame(timers.paint);
      timers.start = undefined;
      timers.interval = undefined;
      timers.paint = undefined;
    };

    clearTimers();

    if (!hovered || lightboxOpen || reduceMotion || !extrasReady) {
      return clearTimers;
    }

    const advance = () => {
      setSlide((current) => ({
        prevIndex: current.index,
        index: (current.index + 1) % imageCount,
        hasCycled: true,
      }));
    };

    // Wait two frames so the next images mount off-screen behind the featured
    // image before the first slide starts.
    timers.paint = window.requestAnimationFrame(() => {
      timers.paint = window.requestAnimationFrame(() => {
        advance();
        timers.interval = window.setInterval(advance, CYCLE_MS);
      });
    });

    return clearTimers;
  }, [hovered, lightboxOpen, imageCount, extrasReady, reduceMotion]);

  function handleEnter() {
    setExtrasReady(true);
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
    setSlide(INITIAL_SLIDE);
  }

  return (
    <>
      <article
        data-range-card
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e8e8e8] bg-background shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 ease-out hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            handleLeave();
          }
        }}
      >
        <button
          type="button"
          className="flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            setExtrasReady(true);
            setLightboxOpen(true);
          }}
          aria-label={`View images of ${product.title}`}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-background-subtle">
            {visibleImages.map((image, imageIndex) => {
              const isActive = imageIndex === slide.index;
              const isOutgoing =
                slide.hasCycled && imageIndex === slide.prevIndex && !isActive;

              let translate = "-translate-x-full";
              if (isActive) translate = "translate-x-0";
              else if (isOutgoing) translate = "translate-x-full";

              // Keep the front (outgoing) image on top so the next slide
              // moves in from behind it.
              const zIndex = isOutgoing ? 3 : isActive ? 1 : 0;

              return (
                <div
                  key={image.src}
                  className={`absolute inset-0 bg-background-subtle transition-transform ease-in-out ${translate}`}
                  style={{
                    transitionDuration: `${slide.hasCycled ? TRANSITION_MS : 0}ms`,
                    zIndex,
                  }}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-[7px] bg-[#f5f5f5] text-foreground transition-colors duration-300 group-hover:bg-[#efefef]">
              <ShoppingBagIcon />
            </div>
            <h3 className="text-lg font-semibold leading-[1.3] text-foreground">
              {product.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.65] text-muted">
              {product.description}
            </p>
          </div>
        </button>
      </article>

      {lightboxOpen ? (
        <ProductImageLightbox
          title={product.title}
          images={product.images}
          initialIndex={0}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}
