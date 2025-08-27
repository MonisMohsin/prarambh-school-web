import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const programs = [
  {
    title: "Toddler Care (1-2 years)",
    description: "Gentle introduction to social interaction and basic learning through sensory play and exploration.",
    icon: "🧸",
    features: ["Sensory Play", "Music & Movement", "Basic Motor Skills", "Loving Care"],
  },
  {
    title: "Preschool (3-4 years)",
    description:
      "Structured learning activities that prepare children for kindergarten while maintaining the joy of discovery.",
    icon: "🎨",
    features: ["Early Literacy", "Creative Arts", "Social Skills", "Problem Solving"],
  },
  {
    title: "Pre-K (4-5 years)",
    description: "Comprehensive kindergarten preparation with advanced learning concepts and independence building.",
    icon: "📚",
    features: ["Reading Readiness", "Math Concepts", "Science Exploration", "Leadership Skills"],
  },
  {
    title: "After School Care",
    description: "Safe, supervised environment for school-age children with homework help and enrichment activities.",
    icon: "⚽",
    features: ["Homework Support", "Outdoor Play", "Arts & Crafts", "Healthy Snacks"],
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Age-appropriate programs designed to foster growth, learning, and development at every stage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{program.icon}</div>
                <CardTitle className="text-xl font-bold text-foreground">{program.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
