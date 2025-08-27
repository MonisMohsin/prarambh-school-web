import { getDatabase } from "@/lib/mongodb"
import type { User, CreateUserData, LoginCredentials, AuthUser } from "@/lib/models/user"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = "7d"

export class AuthService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  static async createUser(data: CreateUserData): Promise<User> {
    const collection = await this.getCollection()

    // Check if user already exists
    const existingUser = await collection.findOne({ email: data.email })
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    const user: Omit<User, "_id"> = {
      ...data,
      password: hashedPassword,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(user)
    return { ...user, _id: result.insertedId.toString() }
  }

  static async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | null> {
    const collection = await this.getCollection()

    // Find user by email
    const user = await collection.findOne({ email: credentials.email, isActive: true })
    if (!user) {
      return null
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
    if (!isPasswordValid) {
      return null
    }

    // Update last login
    await collection.updateOne({ _id: user._id }, { $set: { lastLogin: new Date(), updatedAt: new Date() } })

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    )

    const authUser: AuthUser = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    return { user: authUser, token }
  }

  static async verifyToken(token: string): Promise<AuthUser | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const collection = await this.getCollection()

      const user = await collection.findOne({
        _id: new ObjectId(decoded.userId),
        isActive: true,
      })

      if (!user) {
        return null
      }

      return {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    } catch (error) {
      return null
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection()
    const user = await collection.findOne({ _id: new ObjectId(id) })
    return user ? { ...user, _id: user._id.toString() } : null
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const collection = await this.getCollection()

    // Hash password if it's being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12)
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" },
    )

    return result ? { ...result, _id: result._id.toString() } : null
  }
}
