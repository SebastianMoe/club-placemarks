import { suite, test, setup } from "mocha";
import { assert } from "chai";
import { db } from "../../src/model/db.ts";
import { maggie, testUsers } from "../fixtures.ts";
import { assertSubset } from "../test-utils.ts";

suite("User Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.userStore!.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore!.create(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore!.create(maggie);
    assertSubset(maggie, newUser);
  });

  test("delete all users", async () => {
    let returnedUsers = await db.userStore!.getAll();
    assert.equal(returnedUsers.length, 3);
    await db.userStore!.deleteAll();
    returnedUsers = await db.userStore!.getAll();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore!.create(maggie);
    const returnedUser1 = await db.userStore!.getById(user._id);
    assert.deepEqual(user, returnedUser1);
  });

  test("delete One User - success", async () => {
    await db.userStore!.deleteById(testUsers[0]._id);
    const returnedUsers = await db.userStore!.getAll();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore!.getById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore!.getById("123");
    assert.isNull(noUserWithId);
  });

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore!.getById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore!.getById("");
    assert.isNull(nullUser);
  });

  test("delete One User - fail", async () => {
    await db.userStore!.deleteById("bad-id");
    const allUsers = await db.userStore!.getAll();
    assert.equal(testUsers.length, allUsers.length);
  });
});
