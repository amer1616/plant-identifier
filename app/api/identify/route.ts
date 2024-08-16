import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "console";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Identify this plant and provide important information about it.";
    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(await image.arrayBuffer()).toString("base64"),
          mimeType: image.type,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log("Identified plant:", text);

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error identifying plant:", error);
    return NextResponse.json(
      { error: "Failed to identify plant" },
      { status: 500 }
    );
  }
}
