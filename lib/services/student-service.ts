import { getDatabase } from "@/lib/mongodb"
import type { Student, CreateStudentData } from "@/lib/models/student"
import { ObjectId } from "mongodb"

export class StudentService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Student>("students")
  }

  static async createStudent(data: CreateStudentData): Promise<Student> {
    const collection = await this.getCollection()

    // Calculate age from date of birth
    const age = Math.floor((Date.now() - data.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))

    const student: Omit<Student, "_id"> = {
      ...data,
      age,
      enrollmentDate: new Date(),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(student)
    return { ...student, _id: result.insertedId.toString() }
  }

  static async getStudentById(id: string): Promise<Student | null> {
    const collection = await this.getCollection()
    const student = await collection.findOne({ _id: new ObjectId(id) })
    return student ? { ...student, _id: student._id.toString() } : null
  }

  static async getAllStudents(): Promise<Student[]> {
    const collection = await this.getCollection()
    const students = await collection.find({}).toArray()
    return students.map((student) => ({ ...student, _id: student._id.toString() }))
  }

  static async getStudentsByProgram(programId: string): Promise<Student[]> {
    const collection = await this.getCollection()
    const students = await collection.find({ programId }).toArray()
    return students.map((student) => ({ ...student, _id: student._id.toString() }))
  }

  static async updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result ? { ...result, _id: result._id.toString() } : null
  }

  static async deleteStudent(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }
}
