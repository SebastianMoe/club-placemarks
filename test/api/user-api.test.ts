import { suite, test, setup, teardown } from "mocha";
import { assert } from "chai";
import { maggie, testUsers } from "../fixtures.ts";
import { assertSubset } from "../test-utils.ts";
import type { User } from "../../src/model/interface/user.ts";
import { clubService } from "./api-service.ts";

const users: User[] = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    clubService.clearAuth();
    await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    await clubService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await clubService.createUser(testUsers[i]);
    }
    await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
  });

  teardown(async () => {
    // Cleanup after tests
  });

  test("create a user", async () => {
    const newUser = await clubService.createUser(maggie);
    const { password, ...userWithoutPassword } = maggie;
    assertSubset(userWithoutPassword, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await clubService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await clubService.deleteAllUsers();
    await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    returnedUsers = await clubService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await clubService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await clubService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await clubService.deleteAllUsers();
    await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    try {
      const returnedUser = await clubService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
