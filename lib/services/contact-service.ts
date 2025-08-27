import { getDatabase } from "@/lib/mongodb"
import type { ContactInquiry, CreateContactInquiryData } from "@/lib/models/contact-inquiry"
import { ObjectId } from "mongodb"

export class ContactService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<ContactInquiry>("contact_inquiries")
  }

  static async createInquiry(data: CreateContactInquiryData): Promise<ContactInquiry> {
    const collection = await this.getCollection()

    const inquiry: Omit<ContactInquiry, "_id"> = {
      ...data,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(inquiry)
    return { ...inquiry, _id: result.insertedId.toString() }
  }

  static async getInquiryById(id: string): Promise<ContactInquiry | null> {
    const collection = await this.getCollection()
    const inquiry = await collection.findOne({ _id: new ObjectId(id) })
    return inquiry ? { ...inquiry, _id: inquiry._id.toString() } : null
  }

  static async getAllInquiries(): Promise<ContactInquiry[]> {
    const collection = await this.getCollection()
    const inquiries = await collection.find({}).sort({ createdAt: -1 }).toArray()
    return inquiries.map((inquiry) => ({ ...inquiry, _id: inquiry._id.toString() }))
  }

  static async getInquiriesByStatus(status: ContactInquiry["status"]): Promise<ContactInquiry[]> {
    const collection = await this.getCollection()
    const inquiries = await collection.find({ status }).sort({ createdAt: -1 }).toArray()
    return inquiries.map((inquiry) => ({ ...inquiry, _id: inquiry._id.toString() }))
  }

  static async updateInquiry(id: string, updates: Partial<ContactInquiry>): Promise<ContactInquiry | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" },
    )
    return result ? { ...result, _id: result._id.toString() } : null
  }
}
