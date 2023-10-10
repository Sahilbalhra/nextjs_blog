import PostModel from "@/models/Post.model";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    const post = await PostModel.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    await PostModel.findByIdAndDelete(id);
    return new NextResponse("Post have been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
