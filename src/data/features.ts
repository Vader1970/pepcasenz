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
    image: "/images/secure-locking.jpg",
    imageAlt: "Close-up of the PEP CASE dual blue locking latches",
    imageWidth: 1024,
    imageHeight: 768,
    icon: "shield",
  },
  {
    title: "40 Custom Slots",
    description:
      "Holds up to 40 vials (3ml) securely in place with custom-fit slots.",
    image: "/images/custom-slots.jpg",
    imageAlt: "Custom-fit foam slots holding medication vials upright",
    imageWidth: 1024,
    imageHeight: 1024,
    icon: "grid",
  },
  {
    title: "Durable Build",
    description:
      "Made with high-quality, impact-resistant materials built to last.",
    image: "/images/durable-build.jpg",
    imageAlt: "Durable hard-shell case exterior with reinforced texture",
    imageWidth: 1024,
    imageHeight: 682,
    icon: "diamond",
  },
  {
    title: "Compact Design",
    description:
      "Sleek and portable — fits easily in a bag or refrigerator.",
    image: "/images/compact-design.jpg",
    imageAlt: "Compact PEP CASE open showing organised vial storage layout",
    imageWidth: 1024,
    imageHeight: 682,
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
