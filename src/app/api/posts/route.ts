// 👇️ ts-nocheck disables type checking for the entire file
// @ts-nocheck
import PostModel from "@/models/Post.model";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "";

  try {
    await connect();
    const posts = await PostModel.find(username! && { username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const newPost = new PostModel(body);

  try {
    await connect();
    await newPost.save();

    return new NextResponse("Post has been Created", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
