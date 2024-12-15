import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUND_NAME,
} from "@/lib/constant";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: CLOUND_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  // Parse form data
  const formData = await req.formData();

  // Get file from form data
  const file = formData.get("file") as File | null;

  // Validate file
  if (!file) {
    return NextResponse.json(
      { error: "Please select a file" },
      { status: 400 }
    );
  }

  try {
    // Convert file to buffer
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(buffer, {
      public_id: "shoes",
    });

    // Generate optimized and auto-cropped URLs
    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    // Return upload results
    return NextResponse.json({
      uploadResult,
      optimizeUrl,
      autoCropUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
