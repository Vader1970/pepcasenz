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
      "Strong latches keep the case firmly closed and contents securely inside.",
    image: "/images/product-features/secure-locking.webp",
    imageAlt: "Close-up of the PEP CASE dual blue locking latches",
    imageWidth: 768,
    imageHeight: 644,
    icon: "shield",
  },
  {
    title: "Custom Slots",
    description:
      "Purpose-built slots keep vials securely positioned and easy to access.",
    image: "/images/product-features/custom-slots.webp",
    imageAlt: "Custom-fit foam slots holding medication vials upright",
    imageWidth: 768,
    imageHeight: 644,
    icon: "grid",
  },
  {
    title: "Durable Build",
    description:
      "Impact-resistant construction is made to stand up to everyday use.",
    image: "/images/product-features/durable-build.webp",
    imageAlt: "Durable hard-shell case exterior with reinforced texture",
    imageWidth: 768,
    imageHeight: 650,
    icon: "diamond",
  },
  {
    title: "Compact Design",
    description:
      "Designed to make efficient use of space without adding unnecessary bulk.",
    image: "/images/product-features/compact-design.webp",
    imageAlt: "Compact PEP CASE open showing organised vial storage layout",
    imageWidth: 768,
    imageHeight: 641,
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
      "Built to handle the bumps and knocks that come with everyday storage and carrying.",
    icon: "shield",
  },
  {
    title: "Everything in Its Place",
    description:
      "Dedicated spaces make supplies easy to find and keep neatly separated.",
    icon: "box",
  },
  {
    title: "Easy to Take With You",
    description:
      "Compact and lightweight design, perfect for travel and daily use.",
    icon: "airplane",
  },
];
