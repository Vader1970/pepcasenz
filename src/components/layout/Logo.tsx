import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/images/pep-case-nz-logo.png"
      alt="PEP CASE NZ — Storage Solutions"
      width={580}
      height={143}
      className={`h-auto w-[170px] max-w-[190px] object-contain object-left sm:w-[200px] md:max-w-[240px] ${className}`}
      priority
    />
  );
}
