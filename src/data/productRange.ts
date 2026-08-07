export interface ProductRangeItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const productRange: ProductRangeItem[] = [
  {
    title: "Supply Case",
    description:
      "Organised storage for wipes, syringes, and small essentials.",
    image: "/images/product-1.png",
    imageAlt: "Supply case with organised storage for syringes and essentials",
  },
  {
    title: "Travel Vial Kit",
    description:
      "Compact case for vials, alcohol pads, and syringe storage.",
    image: "/images/product-2.png",
    imageAlt: "Travel vial kit with vials and alcohol pads in a compact case",
  },
  {
    title: "Pen Needle Holder",
    description:
      "Securely carries an insulin pen and multiple needle caps.",
    image: "/images/product-3.png",
    imageAlt: "Pen needle holder carrying an insulin pen and needle caps",
  },
  {
    title: "Hard Shell Case",
    description: "Durable outer case with secure locking latches.",
    image: "/images/product-4.png",
    imageAlt: "Hard shell case with secure dual locking latches",
  },
];
