import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const staffMembers = [
  {
    name: "Sarah Johnson",
    role: "Director & Lead Teacher",
    experience: "15 years",
    education: "M.Ed. Early Childhood Education",
    image: "/smiling-teacher.png",
  },
  {
    name: "Maria Rodriguez",
    role: "Preschool Teacher",
    experience: "8 years",
    education: "B.A. Child Development",
    image: "/preschool-teacher-children.png",
  },
  {
    name: "Emily Chen",
    role: "Toddler Specialist",
    experience: "6 years",
    education: "B.S. Early Childhood Education",
    image: "/caring-teacher-toddlers.png",
  },
  {
    name: "David Thompson",
    role: "Physical Education Coordinator",
    experience: "10 years",
    education: "B.S. Kinesiology",
    image: "/placeholder-63fcw.png",
  },
]

export function StaffSection() {
  return (
    <section id="staff" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to your child's growth and development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffMembers.map((member, index) => (
            <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Experience:</span> {member.experience}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Education:</span> {member.education}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
