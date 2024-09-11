import OpenAI from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export async function POST(req) {
  try {
    // Get the JSON body from the request
    const { prompt } = await req.json();

    // Validate the prompt field
    if (typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    // Make the request to OpenAI API
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    console.log(chatCompletion);
    // Return the response content as JSON
    return NextResponse.json({
      message: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);

    // Return the error as JSON with 500 status code
    return NextResponse.json(
      { error: "Error with OpenAI API" },
      { status: 500 }
    );
  }
}
