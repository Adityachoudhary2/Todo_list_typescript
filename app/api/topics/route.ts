import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cruds_db");
    const topics = await db.collection("topics").find({}).toArray();
    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, createdAt, updatedAt } = await request.json();
    
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Cruds_db");
    
    const result = await db.collection("topics").insertOne({
      title,
      description,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt)
    });

    return NextResponse.json({ 
      message: "Topic created successfully",
      topicId: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}