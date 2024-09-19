import fetch from "node-fetch"; // Import fetch if needed for Node versions < 18
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Define the API URL for the POST request
    const apiUrl =
      "https://medium-list-article-1048073922888.us-central1.run.app";

    // Set up the request body as a JSON object
    const requestBody = {
      type: "list",
    };

    // Make the POST request to the external API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      timeout: 70000, // Optional: Set the timeout to 70 seconds as per curl `-m 70`
    });

    // Handle any unsuccessful requests
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch articles from the API" },
        { status: response.status }
      );
    }

    // Parse the JSON response
    const articles = await response.json();

    // Return the articles as a JSON response
    return NextResponse.json({
      articles: articles.articles,
      status: articles.status,
    });
  } catch (error) {
    console.error("Error fetching articles from the API:", error);

    // Return the error as JSON with a 500 status code
    return NextResponse.json(
      { error: "Error fetching articles from the API" },
      { status: 500 }
    );
  }
}
