// MongoDB Database Seeding Script
// Run this script to populate the database with initial data

const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "school_management"

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Clear existing data
    await db.collection("programs").deleteMany({})
    await db.collection("staff").deleteMany({})
    await db.collection("students").deleteMany({})
    await db.collection("activities").deleteMany({})

    console.log("Cleared existing data")

    // Seed Programs
    const programs = [
      {
        name: "Toddler Care (1-2 years)",
        description:
          "Gentle introduction to social interaction and basic learning through sensory play and exploration.",
        ageRange: { min: 12, max: 24 },
        capacity: 12,
        currentEnrollment: 8,
        schedule: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "07:00",
          endTime: "18:00",
        },
        tuition: {
          monthly: 1200,
          registration: 150,
          materials: 50,
        },
        features: ["Sensory Play", "Music & Movement", "Basic Motor Skills", "Loving Care"],
        staffIds: [],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Preschool (3-4 years)",
        description:
          "Structured learning activities that prepare children for kindergarten while maintaining the joy of discovery.",
        ageRange: { min: 36, max: 48 },
        capacity: 16,
        currentEnrollment: 14,
        schedule: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "07:00",
          endTime: "18:00",
        },
        tuition: {
          monthly: 1100,
          registration: 150,
          materials: 75,
        },
        features: ["Early Literacy", "Creative Arts", "Social Skills", "Problem Solving"],
        staffIds: [],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pre-K (4-5 years)",
        description:
          "Comprehensive kindergarten preparation with advanced learning concepts and independence building.",
        ageRange: { min: 48, max: 60 },
        capacity: 18,
        currentEnrollment: 16,
        schedule: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "07:00",
          endTime: "18:00",
        },
        tuition: {
          monthly: 1000,
          registration: 150,
          materials: 100,
        },
        features: ["Reading Readiness", "Math Concepts", "Science Exploration", "Leadership Skills"],
        staffIds: [],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "After School Care",
        description:
          "Safe, supervised environment for school-age children with homework help and enrichment activities.",
        ageRange: { min: 60, max: 144 },
        capacity: 20,
        currentEnrollment: 12,
        schedule: {
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "15:00",
          endTime: "18:00",
        },
        tuition: {
          monthly: 600,
          registration: 100,
          materials: 25,
        },
        features: ["Homework Support", "Outdoor Play", "Arts & Crafts", "Healthy Snacks"],
        staffIds: [],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const programResult = await db.collection("programs").insertMany(programs)
    console.log(`Inserted ${programResult.insertedCount} programs`)

    // Seed Staff
    const staff = [
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@littlelearners.com",
        phone: "(555) 123-4567",
        role: "director",
        department: "Administration",
        hireDate: new Date("2015-08-15"),
        education: {
          degree: "M.Ed. Early Childhood Education",
          institution: "State University",
          year: 2014,
        },
        experience: 15,
        certifications: ["Early Childhood Education License", "CPR Certified", "First Aid Certified"],
        bio: "Sarah has dedicated her career to early childhood education and believes in nurturing each child's unique potential.",
        profileImage: "/smiling-teacher.png",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Maria",
        lastName: "Rodriguez",
        email: "maria.rodriguez@littlelearners.com",
        phone: "(555) 234-5678",
        role: "teacher",
        department: "Preschool",
        hireDate: new Date("2018-01-10"),
        education: {
          degree: "B.A. Child Development",
          institution: "Community College",
          year: 2017,
        },
        experience: 8,
        certifications: ["Child Development Associate", "CPR Certified"],
        bio: "Maria brings creativity and enthusiasm to the classroom, making learning fun and engaging for all children.",
        profileImage: "/preschool-teacher-children.png",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Emily",
        lastName: "Chen",
        email: "emily.chen@littlelearners.com",
        phone: "(555) 345-6789",
        role: "teacher",
        department: "Toddler Care",
        hireDate: new Date("2020-03-01"),
        education: {
          degree: "B.S. Early Childhood Education",
          institution: "Regional University",
          year: 2019,
        },
        experience: 6,
        certifications: ["Early Childhood Education License", "Infant/Toddler Specialist"],
        bio: "Emily specializes in toddler development and creates nurturing environments for our youngest learners.",
        profileImage: "/caring-teacher-toddlers.png",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "David",
        lastName: "Thompson",
        email: "david.thompson@littlelearners.com",
        phone: "(555) 456-7890",
        role: "coordinator",
        department: "Physical Education",
        hireDate: new Date("2019-09-15"),
        education: {
          degree: "B.S. Kinesiology",
          institution: "Sports University",
          year: 2018,
        },
        experience: 10,
        certifications: ["Youth Sports Coaching", "CPR Certified", "First Aid Certified"],
        bio: "David promotes physical fitness and healthy habits through fun, age-appropriate activities and games.",
        profileImage: "/placeholder-63fcw.png",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const staffResult = await db.collection("staff").insertMany(staff)
    console.log(`Inserted ${staffResult.insertedCount} staff members`)

    // Seed Activities
    const activities = [
      {
        title: "Creative Arts & Crafts",
        description: "Painting, drawing, and hands-on projects that spark imagination and creativity.",
        category: "arts",
        ageGroups: [programResult.insertedIds[1].toString(), programResult.insertedIds[2].toString()],
        duration: 45,
        materials: ["Paint", "Brushes", "Paper", "Crayons", "Glue", "Scissors"],
        instructions:
          "Set up art stations with various materials. Guide children through creative projects while encouraging self-expression.",
        images: ["/children-painting.png"],
        staffId: staffResult.insertedIds[1].toString(),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Music & Movement",
        description: "Singing, dancing, and musical instrument exploration to develop rhythm and coordination.",
        category: "music",
        ageGroups: [programResult.insertedIds[0].toString(), programResult.insertedIds[1].toString()],
        duration: 30,
        materials: ["Musical instruments", "Scarves", "Music player", "Song sheets"],
        instructions:
          "Lead children in songs, dances, and instrument play. Focus on rhythm, movement, and musical expression.",
        images: ["/music-class-fun.png"],
        staffId: staffResult.insertedIds[2].toString(),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Story Time & Reading",
        description: "Interactive storytelling sessions that build language skills and love for books.",
        category: "reading",
        ageGroups: [programResult.insertedIds[1].toString(), programResult.insertedIds[2].toString()],
        duration: 20,
        materials: ["Picture books", "Story props", "Comfortable seating"],
        instructions:
          "Read engaging stories with expression. Encourage participation through questions and predictions.",
        images: ["/teacher-reading-storybook.png"],
        staffId: staffResult.insertedIds[1].toString(),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const activityResult = await db.collection("activities").insertMany(activities)
    console.log(`Inserted ${activityResult.insertedCount} activities`)

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

// Run the seeding function
seedDatabase().catch(console.error)
