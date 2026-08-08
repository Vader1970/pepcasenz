import type { FeatureIconName } from "@/components/ui/FeatureIcon";

export interface Feature {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  icon: FeatureIconName;
}

export const features: Feature[] = [
  {
    title: "Secure Locking",
    description:
      "Strong dual latches keep your case sealed and contents secure.",
    image: "/images/product-features/secure-locking.webp",
    imageAlt: "Close-up of the PEP CASE dual blue locking latches",
    imageWidth: 840,
    imageHeight: 704,
    icon: "shield",
  },
  {
    title: "Custom Slots",
    description:
      "Purpose-built slots keep vials securely positioned and organised.",
    image: "/images/product-features/custom-slots.webp",
    imageAlt: "Custom-fit foam slots holding medication vials upright",
    imageWidth: 840,
    imageHeight: 704,
    icon: "grid",
  },
  {
    title: "Durable Build",
    description:
      "Made with high-quality, impact-resistant materials built to last.",
    image: "/images/product-features/durable-build.webp",
    imageAlt: "Durable hard-shell case exterior with reinforced texture",
    imageWidth: 840,
    imageHeight: 711,
    icon: "diamond",
  },
  {
    title: "Compact Design",
    description:
      "Sleek and portable - fits easily in a bag or refrigerator.",
    image: "/images/product-features/compact-design.webp",
    imageAlt: "Compact PEP CASE open showing organised vial storage layout",
    imageWidth: 840,
    imageHeight: 701,
    icon: "briefcase",
  },
];

export interface Benefit {
  title: string;
  description: string;
  icon: "shield" | "box" | "airplane";
}

export const benefits: Benefit[] = [
  {
    title: "Maximum Protection",
    description:
      "Durable, impact-resistant materials keep vials safe from damage.",
    icon: "shield",
  },
  {
    title: "Organised Storage",
    description:
      "Custom slots keep vials upright, secure, and easy to find.",
    icon: "box",
  },
  {
    title: "Travel Friendly",
    description:
      "Compact and lightweight design, perfect for travel and daily use.",
    icon: "airplane",
  },
];
