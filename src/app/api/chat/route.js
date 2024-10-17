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

    // Make the request to OpenAI API with streaming enabled
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of chatCompletion) {
          // Send each chunk to the client
          controller.enqueue(
            new TextEncoder().encode(chunk.choices[0].delta.content)
          );
        }
        controller.close();
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
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
