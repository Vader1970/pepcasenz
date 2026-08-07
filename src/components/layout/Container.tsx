interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-10 xl:px-14 ${className}`}
    >
      {children}
    </div>
  );
}
