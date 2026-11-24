import { describe, expect, test, vi } from "vitest";

// Set the S3 environment variables before importing storage.service.js
import "../helpers/use-s3.js";

import { getUrl } from "../../src/services/storage.service.js";

// Replace the AWS presigner with a fake function so no real AWS request is made
vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: vi.fn(async () => "https://signed.example.com/notes.pdf"),
}));

describe("getUrl with S3", () => {
  test("returns the signed link", async () => {
    const url = await getUrl("notes.pdf", "notes.pdf", "application/pdf");

    expect(url).toBe("https://signed.example.com/notes.pdf");
  });
});
