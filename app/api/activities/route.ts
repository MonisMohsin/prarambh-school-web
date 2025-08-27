import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Activity } from "@/lib/models/activity"

async function getCollection() {
  const db = await getDatabase()
  return db.collection<Activity>("activities")
}

export async function GET() {
  try {
    const collection = await getCollection()
    const activities = await collection.find({ status: "active" }).toArray()
    const formattedActivities = activities.map((activity) => ({
      ...activity,
      _id: activity._id?.toString(),
    }))

    return NextResponse.json({ success: true, data: formattedActivities })
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "category", "ageGroups", "duration", "staffId"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const collection = await getCollection()
    const activityData: Omit<Activity, "_id"> = {
      ...body,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(activityData)
    const activity = { ...activityData, _id: result.insertedId.toString() }

    return NextResponse.json({ success: true, data: activity }, { status: 201 })
  } catch (error) {
    console.error("Error creating activity:", error)
    return NextResponse.json({ success: false, error: "Failed to create activity" }, { status: 500 })
  }
}
