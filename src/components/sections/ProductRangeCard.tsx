"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ExpandIcon, ShoppingBagIcon } from "@/components/ui/icons";
import { ProductImageLightbox } from "@/components/ui/ProductImageLightbox";
import type { ProductRangeItem } from "@/data/productRange";
import { usePrefersReducedMotion, useTouchLayout } from "@/lib/motion";

interface ProductRangeCardProps {
  product: ProductRangeItem;
}

const TRANSITION_MS = 2000;
const SWIPE_TRANSITION_MS = 300;
const HOLD_MS = 1000;
const CYCLE_MS = TRANSITION_MS + HOLD_MS;
const SWIPE_THRESHOLD_PX = 40;
const SWIPE_INTENT_PX = 10;

interface SlideState {
  index: number;
  prevIndex: number;
  hasCycled: boolean;
  slideDir: "next" | "prev";
}

const INITIAL_SLIDE: SlideState = {
  index: 0,
  prevIndex: 0,
  hasCycled: false,
  slideDir: "next",
};

export function ProductRangeCard({ product }: ProductRangeCardProps) {
  const [hovered, setHovered] = useState(false);
  const [extrasReady, setExtrasReady] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slide, setSlide] = useState<SlideState>(INITIAL_SLIDE);
  const [transitionMs, setTransitionMs] = useState(TRANSITION_MS);
  const timersRef = useRef<{
    interval?: number;
    paint?: number;
  }>({});
  const imageZoneRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const horizontalSwipeRef = useRef(false);
  const swipedRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchHorizontalRef = useRef(false);
  const reduceMotion = usePrefersReducedMotion();
  const isTouchLayout = useTouchLayout();
  const imageCount = product.images.length;
  const imagesLoaded = extrasReady || isTouchLayout;
  const visibleImages = imagesLoaded ? product.images : product.images.slice(0, 1);

  const goNext = useCallback(
    (fast = false) => {
      setTransitionMs(fast ? SWIPE_TRANSITION_MS : TRANSITION_MS);
      setSlide((current) => ({
        prevIndex: current.index,
        index: (current.index + 1) % imageCount,
        hasCycled: true,
        slideDir: "next",
      }));
    },
    [imageCount],
  );

  const goPrev = useCallback(
    (fast = false) => {
      setTransitionMs(fast ? SWIPE_TRANSITION_MS : TRANSITION_MS);
      setSlide((current) => ({
        prevIndex: current.index,
        index: (current.index - 1 + imageCount) % imageCount,
        hasCycled: true,
        slideDir: "prev",
      }));
    },
    [imageCount],
  );

  const applySwipe = useCallback(
    (deltaX: number) => {
      if (deltaX <= -SWIPE_THRESHOLD_PX) {
        swipedRef.current = true;
        goNext(true);
      } else if (deltaX >= SWIPE_THRESHOLD_PX) {
        swipedRef.current = true;
        goPrev(true);
      }
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    if (!isTouchLayout || imageCount <= 1) return;

    const el = imageZoneRef.current;
    if (!el) return;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      touchHorizontalRef.current = false;
      swipedRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = event.touches[0];
      if (!start || !touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (
        !touchHorizontalRef.current &&
        Math.abs(deltaX) > SWIPE_INTENT_PX &&
        Math.abs(deltaX) > Math.abs(deltaY)
      ) {
        touchHorizontalRef.current = true;
      }

      if (touchHorizontalRef.current) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;

      const touch = event.changedTouches[0];
      if (!touch) {
        touchStartRef.current = null;
        touchHorizontalRef.current = false;
        return;
      }

      const deltaX = touch.clientX - start.x;
      touchStartRef.current = null;

      if (touchHorizontalRef.current) {
        applySwipe(deltaX);
      }

      touchHorizontalRef.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [applySwipe, imageCount, isTouchLayout]);

  useEffect(() => {
    const timers = timersRef.current;

    const clearTimers = () => {
      if (timers.interval !== undefined) window.clearInterval(timers.interval);
      if (timers.paint !== undefined) window.cancelAnimationFrame(timers.paint);
      timers.interval = undefined;
      timers.paint = undefined;
    };

    clearTimers();

    if (
      isTouchLayout ||
      !hovered ||
      lightboxOpen ||
      reduceMotion ||
      !imagesLoaded
    ) {
      return clearTimers;
    }

    const advance = () => {
      goNext(false);
    };

    timers.paint = window.requestAnimationFrame(() => {
      timers.paint = window.requestAnimationFrame(() => {
        advance();
        timers.interval = window.setInterval(advance, CYCLE_MS);
      });
    });

    return clearTimers;
  }, [
    hovered,
    lightboxOpen,
    imagesLoaded,
    reduceMotion,
    isTouchLayout,
    goNext,
  ]);

  function openLightbox() {
    setExtrasReady(true);
    setLightboxOpen(true);
  }

  function handleEnter() {
    setExtrasReady(true);
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
    if (!isTouchLayout) {
      setSlide(INITIAL_SLIDE);
      setTransitionMs(TRANSITION_MS);
    }
  }

  function handleImagePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isTouchLayout || imageCount <= 1 || event.pointerType === "touch") {
      return;
    }

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    horizontalSwipeRef.current = false;
    swipedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleImagePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      pointerStartX.current === null ||
      pointerStartY.current === null ||
      event.pointerType === "touch"
    ) {
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;
    const deltaY = event.clientY - pointerStartY.current;

    if (
      !horizontalSwipeRef.current &&
      Math.abs(deltaX) > SWIPE_INTENT_PX &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      horizontalSwipeRef.current = true;
    }
  }

  function handleImagePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!isTouchLayout || imageCount <= 1 || event.pointerType === "touch") {
      return;
    }

    if (pointerStartX.current === null) return;

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    pointerStartY.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (horizontalSwipeRef.current) {
      applySwipe(deltaX);
    }

    horizontalSwipeRef.current = false;
  }

  function handleImageClick() {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    openLightbox();
  }

  const affordanceVisible = "opacity-100";
  const hiddenTranslate =
    slide.slideDir === "next" ? "-translate-x-full" : "translate-x-full";
  const outgoingTranslate =
    slide.slideDir === "next" ? "translate-x-full" : "-translate-x-full";

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
        <div
          ref={imageZoneRef}
          role="button"
          tabIndex={0}
          aria-label={`Browse and view images of ${product.title}`}
          className="relative aspect-square w-full cursor-pointer overflow-hidden bg-background-subtle touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={handleImageClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openLightbox();
            }
          }}
          onPointerDown={handleImagePointerDown}
          onPointerMove={handleImagePointerMove}
          onPointerUp={handleImagePointerUp}
          onPointerCancel={(event) => {
            if (!horizontalSwipeRef.current) {
              pointerStartX.current = null;
              pointerStartY.current = null;
            }

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
        >
          {visibleImages.map((image, imageIndex) => {
            const isActive = imageIndex === slide.index;
            const isOutgoing =
              slide.hasCycled && imageIndex === slide.prevIndex && !isActive;

            let translate = hiddenTranslate;
            if (isActive) translate = "translate-x-0";
            else if (isOutgoing) translate = outgoingTranslate;

            const zIndex = isOutgoing ? 3 : isActive ? 1 : 0;

            return (
              <div
                key={image.src}
                className={`absolute inset-0 bg-background-subtle transition-transform ease-in-out ${translate}`}
                style={{
                  transitionDuration: `${slide.hasCycled ? transitionMs : 0}ms`,
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
                  draggable={false}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            );
          })}

          {imageCount > 1 ? (
            <>
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm ${affordanceVisible}`}
              >
                <ExpandIcon className="h-3.5 w-3.5" />
                {imageCount} photos
              </div>

              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5 ${affordanceVisible}`}
              >
                {product.images.map((image, imageIndex) => (
                  <span
                    key={image.src}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                      imageIndex === slide.index
                        ? "w-5 bg-accent"
                        : "w-1.5 bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <button
          type="button"
          className="flex flex-1 cursor-pointer flex-col p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={openLightbox}
          aria-label={`View images of ${product.title}`}
        >
          <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-[7px] bg-[#f5f5f5] text-foreground transition-colors duration-300 group-hover:bg-[#efefef]">
            <ShoppingBagIcon />
          </div>
          <h3 className="text-lg font-semibold leading-[1.3] text-foreground">
            {product.title}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.65] text-muted">
            {product.description}
          </p>
        </button>
      </article>

      {lightboxOpen ? (
        <ProductImageLightbox
          title={product.title}
          images={product.images}
          initialIndex={slide.index}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}
