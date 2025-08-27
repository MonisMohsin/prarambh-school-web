import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-card to-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/colorful-classroom-fun.png"
          alt="Children playing in classroom"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Nurturing Young Minds in a{" "}
          <span className="text-primary">Joyful Space</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Welcome to Prarambh Academy, where every child's potential is nurtured
          through play-based learning, creative exploration, and loving care in
          a safe, stimulating environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Schedule a Visit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
