export interface ProductRangeImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductRangeItem {
  title: string;
  description: string;
  /** Order: featured, closed, open */
  images: ProductRangeImage[];
}

export const productRange: ProductRangeItem[] = [
  {
    title: "6-Vial Supply Case",
    description:
      "Stores six vials, wipes and syringes together, with room for the essentials you use most.",
    images: [
      {
        src: "/images/product-range/six-viral-supply-case-featured.webp",
        alt: "6-Vial Supply Case featured view with organised vial storage",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/six-viral-supply-case-closed.webp",
        alt: "6-Vial Supply Case closed",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/six-viral-supply-case-open.webp",
        alt: "6-Vial Supply Case open showing interior organisation",
        width: 923,
        height: 1024,
      },
    ],
  },
  {
    title: "3-Vial Travel Kit",
    description:
      "Keeps three vials, alcohol pads and syringes together in a compact case made for travel.",
    images: [
      {
        src: "/images/product-range/three-viral-travel-kit-featured.webp",
        alt: "3-Vial Travel Kit featured view",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/three-viral-travel-kit-closed.webp",
        alt: "3-Vial Travel Kit closed",
        width: 1254,
        height: 1024,
      },
      {
        src: "/images/product-range/three-viral-travel-kit-open.webp",
        alt: "3-Vial Travel Kit open with vials and accessories",
        width: 1024,
        height: 1024,
      },
    ],
  },
  {
    title: "Pen & Needle Holder",
    description:
      "Keeps your injection pen and spare needle caps together, organised and ready when needed.",
    images: [
      {
        src: "/images/product-range/pen-needle-holder-featured.webp",
        alt: "Pen & Needle Holder featured view",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/pen-needle-holder-closed.webp",
        alt: "Pen & Needle Holder closed",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/pen-needle-holder-open.webp",
        alt: "Pen & Needle Holder open with pen and needle caps",
        width: 788,
        height: 1023,
      },
    ],
  },
  {
    title: "6-Vial Hard Shell Case",
    description:
      "Stores six vials, wipes and syringes in a tougher case with secure latches for added protection.",
    images: [
      {
        src: "/images/product-range/six-viral-hard-shell-featured.webp",
        alt: "6-Vial Hard Shell Case featured view",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/six-viral-hard-shell-closed.webp",
        alt: "6-Vial Hard Shell Case closed with locking latches",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/product-range/six-viral-hard-shell-open.webp",
        alt: "6-Vial Hard Shell Case open showing foam insert",
        width: 1024,
        height: 1024,
      },
    ],
  },
];
