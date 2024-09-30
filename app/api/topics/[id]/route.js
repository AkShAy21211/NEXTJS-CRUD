import connectMongodb from "@/libs/db";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description } = await request.json();

  await connectMongodb();

  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json(
    { message: "Topic updated successfully" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongodb();
  const topic = await Topic.findById(id);
  return NextResponse.json(topic, { status: 200 });
}
