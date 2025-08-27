import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-xl text-foreground">Prarambh</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#programs"
            className="text-foreground hover:text-primary transition-colors"
          >
            Programs
          </Link>
          <Link
            href="#admissions"
            className="text-foreground hover:text-primary transition-colors"
          >
            Admissions
          </Link>
          <Link
            href="#staff"
            className="text-foreground hover:text-primary transition-colors"
          >
            Staff
          </Link>
          <Link
            href="#activities"
            className="text-foreground hover:text-primary transition-colors"
          >
            Activities
          </Link>
          <Link
            href="#contact"
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Enroll Now
        </Button>
      </div>
    </header>
  );
}
