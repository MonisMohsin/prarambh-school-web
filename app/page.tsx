import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProgramsSection } from "@/components/programs-section"
import { AdmissionsSection } from "@/components/admissions-section"
import { StaffSection } from "@/components/staff-section"
import { ActivitiesSection } from "@/components/activities-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProgramsSection />
      <AdmissionsSection />
      <StaffSection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
