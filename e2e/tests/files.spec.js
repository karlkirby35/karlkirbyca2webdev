import { expect, test } from "@playwright/test";

test("shows Alice's files after logging in", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByText("Isle of Skye.jpg")).toBeVisible();
});
test("uploads a file", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Log in" }).click();

  await page.getByRole("button", { name: "Upload" }).click();

  await page
    .locator('input[type="file"]')
    .setInputFiles("../backend/db/sample-files/Dolomites sunset.jpg");

  await expect(page.getByText("Dolomites sunset.jpg")).toBeVisible();

  await page.reload();

  await expect(page.getByText("Dolomites sunset.jpg")).toBeVisible();
});
test("shows an error when a file is too large", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Log in" }).click();

  await page
    .locator('input[type="file"]')
    .setInputFiles("tests/fixtures/large-file.txt");

  await expect(page.getByRole("alert")).toHaveText(
    "Files must be 5 MB or smaller",
  );
});
