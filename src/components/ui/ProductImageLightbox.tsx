"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/ui/icons";
import type { ProductRangeImage } from "@/data/productRange";
import { usePrefersReducedMotion } from "@/lib/motion";

interface ProductImageLightboxProps {
  title: string;
  images: ProductRangeImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function ProductImageLightbox({
  title,
  images,
  initialIndex = 0,
  onClose,
}: ProductImageLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [visible, setVisible] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const handleClose = useCallback(() => {
    setVisible(false);
    if (reduceMotion) {
      onClose();
      return;
    }
    window.setTimeout(onClose, 280);
  }, [onClose, reduceMotion]);

  const goTo = useCallback((nextIndex: number, direction: "next" | "prev") => {
    setSlideDir(direction);
    setAnimKey((key) => key + 1);
    setIndex(nextIndex);
  }, []);

  const goNext = useCallback(() => {
    setSlideDir("next");
    setAnimKey((key) => key + 1);
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSlideDir("prev");
    setAnimKey((key) => key + 1);
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
      closeRef.current?.focus();
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, goNext, goPrev]);

  const current = images[index];
  const slideClass = reduceMotion
    ? "opacity-100"
    : slideDir === "next"
      ? "animate-lightbox-slide-next"
      : "animate-lightbox-slide-prev";

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close image gallery"
        className="absolute inset-0 bg-[#0a0a0a]/55 backdrop-blur-[10px]"
        onClick={handleClose}
      />

      <div
        className={`relative z-10 flex w-full max-w-[min(92vw,820px)] flex-col transition-all duration-300 ease-out ${
          visible ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-4 px-1">
          <div className="min-w-0">
            <p
              id={titleId}
              className="truncate text-[15px] font-semibold tracking-[-0.01em] text-white"
            >
              {title}
            </p>
            <p className="mt-0.5 text-xs tracking-[0.08em] text-white/55 uppercase">
              {index + 1} / {images.length}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#f4f4f4] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
          <div key={animKey} className={`absolute inset-0 ${slideClass}`}>
            <Image
              src={current.src}
              alt={current.alt}
              width={Math.min(current.width, 2000)}
              height={Math.min(current.height, 2000)}
              sizes="(max-width: 820px) 92vw, 820px"
              quality={80}
              priority
              className="h-full w-full object-contain p-5 sm:p-10"
            />
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="group absolute top-1/2 left-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/95 text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-5 sm:h-14 sm:w-14"
          >
            <ChevronLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="group absolute top-1/2 right-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/95 text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-5 sm:h-14 sm:w-14"
          >
            <ChevronRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i, i > index ? "next" : "prev")}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                i === index
                  ? "w-7 bg-accent"
                  : "w-1.5 bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
