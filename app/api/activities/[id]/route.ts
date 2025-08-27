import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Activity } from "@/lib/models/activity"
import { ObjectId } from "mongodb"

async function getCollection() {
  const db = await getDatabase()
  return db.collection<Activity>("activities")
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = await getCollection()
    const activity = await collection.findOne({ _id: new ObjectId(params.id) })

    if (!activity) {
      return NextResponse.json({ success: false, error: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { ...activity, _id: activity._id.toString() },
    })
  } catch (error) {
    console.error("Error fetching activity:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch activity" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const collection = await getCollection()

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } },
      { returnDocument: "after" },
    )

    if (!result) {
      return NextResponse.json({ success: false, error: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { ...result, _id: result._id.toString() },
    })
  } catch (error) {
    console.error("Error updating activity:", error)
    return NextResponse.json({ success: false, error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = await getCollection()
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status: "inactive", updatedAt: new Date() } },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Activity deleted successfully" })
  } catch (error) {
    console.error("Error deleting activity:", error)
    return NextResponse.json({ success: false, error: "Failed to delete activity" }, { status: 500 })
  }
}
