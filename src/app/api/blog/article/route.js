import fetch from "node-fetch"; // Import fetch if needed for Node versions < 18
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const { article } = await req.json();
    console.log("article:", article);
    // Define the API URL for the POST request
    const apiUrl =
      "https://medium-list-article-1048073922888.us-central1.run.app";

    // Make the POST request to the external API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "article", // Use the parsed request body
        article: article, // Use the parsed request body
      }),
      timeout: 70000, // Set the timeout to 70 seconds
    });
    console.log("response:", response);

    // Handle any unsuccessful requests
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch articles from the API" },
        { status: response.status }
      );
    }
    console.log("response:", response);

    // Parse the JSON response from the external API
    const article_resp = await response.json();
    console.log("article_resp:", article_resp);

    // Return the articles as a JSON response
    return NextResponse.json({
      article: article_resp,
      status: article_resp.status,
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
