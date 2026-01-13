import { assert } from "chai";
import type { NewUser, User } from "../src/model/interface/user.ts";
import type { NewClub, Club } from "../src/model/interface/club.ts";

export function assertSubset(expected: Partial<User> | NewUser | Partial<Club> | NewClub, actual: User | Club): void {
  Object.keys(expected).forEach((key) => {
    const k = key as keyof typeof expected;
    if (expected[k] !== undefined) {
      assert.deepEqual(actual[k as keyof typeof actual], expected[k], `Expected ${String(k)} to be ${expected[k]}, but got ${actual[k as keyof typeof actual]}`);
    }
  });
}


