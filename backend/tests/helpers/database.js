import { execSync } from "node:child_process";

// Resets the test database by running the seed script.
export function resetDatabase() {
  execSync("npm run db:seed", {
    stdio: "inherit",
  });
}
