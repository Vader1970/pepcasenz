import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PEP CASE NZ | Premium Vial Storage Cases",
  description:
    "Premium storage cases designed to keep peptide and medication vials protected, organised and ready when you need them.",
  openGraph: {
    title: "PEP CASE NZ | Premium Vial Storage Cases",
    description:
      "Premium storage cases designed to keep peptide and medication vials protected, organised and ready when you need them.",
    type: "website",
    locale: "en_NZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
