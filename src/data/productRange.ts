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
      "Organised storage for six vials, wipes, syringes, and everyday essentials.",
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
      "Compact case for three vials, alcohol pads, and syringe storage.",
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
      "Securely carries an insulin pen and multiple needle caps.",
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
      "Durable outer case with secure locking latches for six to eight vials.",
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
