import { execSync } from "node:child_process";

export default function setup() {
  console.log("Preparing test database...");

  execSync("npm run db:seed", {
    stdio: "inherit",
  });

  console.log("Test database ready.");
}
