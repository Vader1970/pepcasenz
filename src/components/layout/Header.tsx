import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { ContactButton } from "@/components/ui/ContactButton";

export function Header() {
  return (
    <header className="border-b border-border-light bg-background">
      <Container>
        <div className="flex h-[72px] items-center justify-between sm:h-[80px] md:h-[84px]">
          <Logo />
          <ContactButton />
        </div>
      </Container>
    </header>
  );
}
