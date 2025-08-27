import { getDatabase } from "@/lib/mongodb"
import type { Program, CreateProgramData } from "@/lib/models/program"
import { ObjectId } from "mongodb"

export class ProgramService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Program>("programs")
  }

  static async createProgram(data: CreateProgramData): Promise<Program> {
    const collection = await this.getCollection()

    const program: Omit<Program, "_id"> = {
      ...data,
      currentEnrollment: 0,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(program)
    return { ...program, _id: result.insertedId.toString() }
  }

  static async getProgramById(id: string): Promise<Program | null> {
    const collection = await this.getCollection()
    const program = await collection.findOne({ _id: new ObjectId(id) })
    return program ? { ...program, _id: program._id.toString() } : null
  }

  static async getAllPrograms(): Promise<Program[]> {
    const collection = await this.getCollection()
    const programs = await collection.find({ status: "active" }).toArray()
    return programs.map((program) => ({ ...program, _id: program._id.toString() }))
  }

  static async updateProgram(id: string, updates: Partial<Program>): Promise<Program | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result ? { ...result, _id: result._id.toString() } : null
  }

  static async updateEnrollmentCount(programId: string, increment: number): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne(
      { _id: new ObjectId(programId) },
      { $inc: { currentEnrollment: increment }, $set: { updatedAt: new Date() } },
    )
  }

  static async deleteProgram(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "inactive", updatedAt: new Date() } },
    )
    return result.modifiedCount > 0
  }
}
