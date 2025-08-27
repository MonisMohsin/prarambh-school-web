import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  P
                </span>
              </div>
              <span className="font-bold text-xl">Prarambh Academy</span>
            </div>
            <p className="text-background/80 mb-4 max-w-md">
              Nurturing young minds through play-based learning, creative
              exploration, and loving care in a safe, stimulating environment.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-background/80 hover:text-background transition-colors"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-background/80 hover:text-background transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-background/80 hover:text-background transition-colors"
              >
                Twitter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#programs"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="#admissions"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="#staff"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Our Staff
                </Link>
              </li>
              <li>
                <Link
                  href="#activities"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Connected</h4>
            <p className="text-background/80 mb-4 text-sm">
              Subscribe to our newsletter for updates and parenting tips.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded bg-background text-foreground text-sm"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 Prarambh Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
