// Mock modules before imports
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: () => Promise.resolve(data),
    })),
  },
}));

// Mock global fetch
global.fetch = jest.fn();

// Mock console.error
const originalConsoleError = console.error;
console.error = jest.fn();

// Set environment variables for tests
process.env.BANDSINTOWN_API_KEY = "test-api-key";
process.env.BANDSINTOWN_API_URL = "https://rest.bandsintown.com/artists";

// Now import after mocks are set up
import { GET } from "../route";
import { NextResponse } from "next/server";

describe("Events API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore console.error
    console.error = originalConsoleError;
  });

  it("should return events data on successful API call", async () => {
    // Mock event data
    const mockEvents = [
      {
        id: "123",
        datetime: "2023-12-31T20:00:00",
        venue: {
          name: "Test Venue",
          city: "Test City",
          country: "Test Country",
        },
        offers: [{ url: "https://example.com/tickets" }],
      },
    ];

    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockEvents),
    });

    // Call the API route handler
    await GET();

    // Assert fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://rest.bandsintown.com/artists/id_15581473/events/?app_id=test-api-key"
    );

    // Check NextResponse.json was called with mockEvents
    expect(NextResponse.json).toHaveBeenCalledWith(mockEvents);
  });

  it("should handle API error responses", async () => {
    // Mock failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    // Call the API route handler
    await GET();

    // Assert the error handling
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Error from Bandsintown API: Not Found" },
      { status: 404 }
    );
  });

  it("should handle fetch exceptions", async () => {
    // Mock fetch throwing an error
    const error = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(error);

    // Call the API route handler
    await GET();

    // Assert error handling
    expect(console.error).toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  });

  it("should handle missing API key", async () => {
    // Temporarily remove the API key
    const originalApiKey = process.env.BANDSINTOWN_API_KEY;
    delete process.env.BANDSINTOWN_API_KEY;

    // Call the API route handler
    await GET();

    // Assert the error response
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "API key not configured" },
      { status: 500 }
    );

    // Restore API key for other tests
    process.env.BANDSINTOWN_API_KEY = originalApiKey;
  });

  it("should handle missing API URL", async () => {
    // Temporarily remove the API URL
    const originalApiUrl = process.env.BANDSINTOWN_API_URL;
    delete process.env.BANDSINTOWN_API_URL;

    // Call the API route handler
    await GET();

    // Assert the error response
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "API URL not configured" },
      { status: 500 }
    );

    // Restore API URL for other tests
    process.env.BANDSINTOWN_API_URL = originalApiUrl;
  });
});
