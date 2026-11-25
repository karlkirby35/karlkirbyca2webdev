import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import { resetDatabase } from "../helpers/database.js";

beforeEach(() => {
  resetDatabase();
});

describe("POST /api/auth/register", () => {
  test("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      first_name: "Test",
      last_name: "User",
      email: "integration@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toEqual({
      id: expect.any(String),
      first_name: "Test",
      last_name: "User",
      email: "integration@example.com",
    });
  });

  test("rejects an invalid email address", async () => {
    const res = await request(app).post("/api/auth/register").send({
      first_name: "Test",
      last_name: "User",
      email: "not-an-email",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Enter a valid email address",
      field: "email",
    });
  });
});
