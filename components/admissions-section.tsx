import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const admissionSteps = [
  {
    step: "1",
    title: "Schedule a Tour",
    description: "Visit our facility and meet our caring staff to see if we're the right fit for your family.",
  },
  {
    step: "2",
    title: "Submit Application",
    description: "Complete our simple online application form with your child's information and preferences.",
  },
  {
    step: "3",
    title: "Meet & Greet",
    description: "Arrange a casual meeting between your child and their potential teachers and classmates.",
  },
  {
    step: "4",
    title: "Welcome to the Family",
    description: "Once accepted, we'll help you prepare for your child's first day with our orientation program.",
  },
]

export function AdmissionsSection() {
  return (
    <section id="admissions" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Admissions Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple steps to join our learning community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {admissionSteps.map((step, index) => (
            <Card key={index} className="text-center border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <CardTitle className="text-lg font-bold text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Start Application
          </Button>
        </div>
      </div>
    </section>
  )
}
