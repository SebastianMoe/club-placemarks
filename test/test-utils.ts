import type { NewUser, User } from "../src/model/interface/user.ts";

export function assertSubset(expected: Partial<User> | NewUser, actual: User): void {
  Object.keys(expected).forEach((key) => {
    const k = key as keyof typeof expected;
    if (expected[k] !== undefined) {
      if (actual[k as keyof User] !== expected[k]) {
        throw new Error(`Expected ${k} to be ${expected[k]}, but got ${actual[k as keyof User]}`);
      }
    }
  });
}
