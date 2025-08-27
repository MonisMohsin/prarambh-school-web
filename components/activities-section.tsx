import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    title: "Creative Arts & Crafts",
    description: "Painting, drawing, and hands-on projects that spark imagination and creativity.",
    image: "/children-painting.png",
  },
  {
    title: "Outdoor Adventures",
    description: "Safe playground activities, nature walks, and outdoor exploration time.",
    image: "/placeholder-islvp.png",
  },
  {
    title: "Music & Movement",
    description: "Singing, dancing, and musical instrument exploration to develop rhythm and coordination.",
    image: "/music-class-fun.png",
  },
  {
    title: "Science Discovery",
    description: "Age-appropriate experiments and discovery activities that encourage curiosity.",
    image: "/placeholder-znx8p.png",
  },
  {
    title: "Story Time & Reading",
    description: "Interactive storytelling sessions that build language skills and love for books.",
    image: "/teacher-reading-storybook.png",
  },
  {
    title: "Cooking Adventures",
    description: "Simple cooking activities that teach following directions and healthy eating.",
    image: "/healthy-snacks-kitchen.png",
  },
]

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Daily Activities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engaging activities designed to promote learning through play and exploration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{activity.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
