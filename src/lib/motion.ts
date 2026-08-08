import { useSyncExternalStore } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotion,
    () => false,
  );
}

function isTouchLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(
    "(max-width: 1023px), (hover: none) and (pointer: coarse)",
  ).matches;
}

function subscribeTouchLayout(onStoreChange: () => void) {
  const narrow = window.matchMedia("(max-width: 1023px)");
  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
  const notify = () => onStoreChange();
  narrow.addEventListener("change", notify);
  coarse.addEventListener("change", notify);
  return () => {
    narrow.removeEventListener("change", notify);
    coarse.removeEventListener("change", notify);
  };
}

export function useTouchLayout(): boolean {
  return useSyncExternalStore(
    subscribeTouchLayout,
    isTouchLayout,
    () => false,
  );
}
