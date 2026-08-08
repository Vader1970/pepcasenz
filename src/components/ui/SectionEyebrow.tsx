interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.07em] text-accent-text sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}
