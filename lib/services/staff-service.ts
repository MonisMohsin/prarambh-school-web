import { getDatabase } from "@/lib/mongodb"
import type { Staff, CreateStaffData } from "@/lib/models/staff"
import { ObjectId } from "mongodb"

export class StaffService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Staff>("staff")
  }

  static async createStaff(data: CreateStaffData): Promise<Staff> {
    const collection = await this.getCollection()

    const staff: Omit<Staff, "_id"> = {
      ...data,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(staff)
    return { ...staff, _id: result.insertedId.toString() }
  }

  static async getStaffById(id: string): Promise<Staff | null> {
    const collection = await this.getCollection()
    const staff = await collection.findOne({ _id: new ObjectId(id) })
    return staff ? { ...staff, _id: staff._id.toString() } : null
  }

  static async getAllStaff(): Promise<Staff[]> {
    const collection = await this.getCollection()
    const staff = await collection.find({ status: "active" }).toArray()
    return staff.map((member) => ({ ...member, _id: member._id.toString() }))
  }

  static async getStaffByRole(role: Staff["role"]): Promise<Staff[]> {
    const collection = await this.getCollection()
    const staff = await collection.find({ role, status: "active" }).toArray()
    return staff.map((member) => ({ ...member, _id: member._id.toString() }))
  }

  static async updateStaff(id: string, updates: Partial<Staff>): Promise<Staff | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result ? { ...result, _id: result._id.toString() } : null
  }

  static async deleteStaff(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "inactive", updatedAt: new Date() } },
    )
    return result.modifiedCount > 0
  }
}
