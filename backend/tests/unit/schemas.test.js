import { describe, expect, test } from "vitest";

import { createToken, getUserIdFromToken } from "../../src/utils/token.js";

//describe groups related tests together
describe("getUserIdFromToken", () => {
  test("accepts a valid token", () => {
    //create a token for user with id "user-123"
    const token = createToken("user-123");

    //check the token returns the correct user id
    expect(getUserIdFromToken(token)).toBe("user-123");
  });

  //test.each allows me to test multiple inputs without writing separate test cases for each one
  //test invalid token inputs
  test.each([
    ["invalid-token"],
    [""],
    ["not.a.valid.token"],
    [undefined],
    [null],

    //%j displays inout being tested in the test name
    //(token) receives each value from array
  ])("rejects invalid token %j", (token) => {
    
    //check the invalid tokens return null
    expect(getUserIdFromToken(token)).toBeNull();
  });
});
