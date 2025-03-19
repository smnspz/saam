import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Use the band name directly since it's our website
    const artistID = 15581473;

    // Get API key from environment variables
    const apiKey = process.env.BANDSINTOWN_API_KEY;
    const apiUrl = process.env.BANDSINTOWN_API_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    if (!apiUrl) {
      return NextResponse.json(
        { error: "API URL not configured" },
        { status: 500 }
      );
    }

    // Construct the Bandsintown API URL
    const url = `${apiUrl}/id_${encodeURIComponent(
      artistID
    )}/events/?app_id=${apiKey}`;

    // Fetch data from Bandsintown API
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from Bandsintown API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the events data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
