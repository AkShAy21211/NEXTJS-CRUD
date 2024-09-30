import connectMongodb from "@/libs/db";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();

  await connectMongodb();

  await Topic.create({
    title,
    description,
  });

  return NextResponse.json(
    { message: "Topic created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongodb();

  const topics = await Topic.find();

  return NextResponse.json(topics);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongodb();

  await Topic.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Topic deleted successfully" },
    { status: 200 }
  );
}


export async function middleware(req) {
  if (req.method === "OPTIONS") {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    return new Response(null, {
      status: 204,
      headers,
    });
  }
  
  return NextResponse.next(); 
}
