"use client";

import { useCallback, useRef, useState } from "react";

const CONTACT_EMAIL = "pepcasenz@gmail.com";
const RESET_DELAY_MS = 1750;

interface ContactButtonProps {
  className?: string;
}

async function copyEmailToClipboard(email: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      // fall through to legacy fallback
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export function ContactButton({ className = "" }: ContactButtonProps) {
  const [label, setLabel] = useState("Contact Us");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    const copied = await copyEmailToClipboard(CONTACT_EMAIL);
    setLabel(copied ? "Email Copied" : "Copy Failed");

    resetTimeoutRef.current = setTimeout(() => {
      setLabel("Contact Us");
      resetTimeoutRef.current = null;
    }, RESET_DELAY_MS);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex h-[46px] items-center justify-center rounded-[5px] bg-button-background px-7 text-sm font-semibold text-button-foreground transition-[transform,background-color,box-shadow] duration-[180ms] ease-out hover:-translate-y-px hover:bg-[#222222] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      >
        {label}
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {label === "Email Copied"
          ? `${CONTACT_EMAIL} copied to clipboard`
          : label === "Copy Failed"
            ? "Unable to copy email address"
            : ""}
      </span>
    </>
  );
}
