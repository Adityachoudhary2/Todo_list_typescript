import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Cruds_db");
    const topic = await db.collection("topics").findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ topic });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch topic" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description } = await request.json();
    const client = await clientPromise;
    const db = client.db("Cruds_db");
    
    await db.collection("topics").updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: { 
          title, 
          description,
          updatedAt: new Date()
        } 
      }
    );
    
    return NextResponse.json({ message: "Topic updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update topic" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Cruds_db");
    
    await db.collection("topics").deleteOne({
      _id: new ObjectId(params.id)
    });
    
    return NextResponse.json({ message: "Topic deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete topic" }, { status: 500 });
  }
}