import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

export async function POST(req) {
  try {
    // Get the JSON body from the request
    const { key, prompt } = await req.json();

    // Validate the key and prompt fields
    if (typeof key !== "string" || key.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing key" },
        { status: 400 }
      );
    }

    if (typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    // Make the POST request to the specified URL
    const response = await fetch(
      "https://ch-chat-1048073922888.us-central1.run.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, prompt }),
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Return the response content as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error with the POST request:", error);

    // Return the error as JSON with 500 status code
    return NextResponse.json(
      { error: "Error with the POST request" },
      { status: 500 }
    );
  }
}
