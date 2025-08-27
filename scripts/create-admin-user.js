// Script to create the initial admin user
// Run this script after setting up the database

const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "school_management"

async function createAdminUser() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)
    const usersCollection = db.collection("users")

    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@littlelearners.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 12)

    // Create admin user
    const adminUser = {
      email: "admin@littlelearners.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usersCollection.insertOne(adminUser)
    console.log("Admin user created successfully:", result.insertedId)
    console.log("Login credentials:")
    console.log("Email: admin@littlelearners.com")
    console.log("Password: admin123")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
  }
}

// Run the function
createAdminUser().catch(console.error)
