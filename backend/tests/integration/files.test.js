import { readFile } from "node:fs/promises";

import { beforeEach, describe, expect, test } from "vitest";
import request from "supertest";

import app from "../../src/app.js";
import { resetDatabase } from "../helpers/database.js";

beforeEach(() => {
  resetDatabase();
});

describe("files", () => {
  test("saves an uploaded file", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: "alice@example.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/files")
      .set("Authorization", `Bearer ${login.body.token}`)
      .attach("files", "tests/fixtures/test-upload.jpg");

    expect(res.status).toBe(201);
    expect(res.body[0].name).toBe("test-upload.jpg");

    const fileUrl = new URL(res.body[0].url);

    const file = await request(app)
      .get(fileUrl.pathname + fileUrl.search)
      .buffer(true)
      .parse((res, callback) => {
        const chunks = [];

        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => callback(null, Buffer.concat(chunks)));
      });

    expect(file.status).toBe(200);

    expect(file.body).toEqual(await readFile("tests/fixtures/test-upload.jpg"));

    await request(app)
      .delete(`/api/files/${res.body[0].id}`)
      .set("Authorization", `Bearer ${login.body.token}`);
  });

  test("rejects a file over 5 MB", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: "alice@example.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/files")
      .set("Authorization", `Bearer ${login.body.token}`)
      .attach("files", "tests/fixtures/blue-marble-large.jpg");

    expect(res.status).toBe(413);
  });
});
