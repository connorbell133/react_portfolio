import fetch from "node-fetch"; // Import fetch if needed for Node versions < 18
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  try {
    // Set up the GitHub API URL
    const githubApiUrl = "https://api.github.com/users/connorbell133/repos";

    // Fetch the starred repositories from GitHub
    const response = await fetch(githubApiUrl, {});

    // Handle any unsuccessful requests
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch starred repositories from GitHub" },
        { status: response.status }
      );
    }

    // Parse the JSON response
    const starredRepos = await response.json();

    // Return the list of starred repositories
    return NextResponse.json({
      repositories: starredRepos,
    });
  } catch (error) {
    console.error("Error fetching starred repositories from GitHub:", error);

    // Return the error as JSON with a 500 status code
    return NextResponse.json(
      { error: "Error fetching starred repositories from GitHub" },
      { status: 500 }
    );
  }
}
