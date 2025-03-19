import { formatDate } from "../dateUtils";

describe("Date formatting", () => {
  it("formats ISO date 2025-03-30T16:00:00 to 30/03/2025", () => {
    const isoDate = "2025-03-30T16:00:00";

    // Format the date using the utility function
    const formattedDate = formatDate(isoDate);

    // Assert the expected format
    expect(formattedDate).toBe("30 Marzo 2025");
  });
});
