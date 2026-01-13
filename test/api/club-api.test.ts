import { suite, test, setup, teardown } from "mocha";
import { assert } from "chai";
import { maggie, testClub, testClubs, updatedTestClub } from "../fixtures.ts";
import { assertSubset } from "../test-utils.ts";
import type { Club } from "../../src/model/interface/club.ts";

import type { User } from "../../src/model/interface/user.ts";
import { clubService } from "./api-service.ts";

let user: User;
const clubs: Club[] = new Array(testClubs.length);

suite("Club API tests", () => {
  setup(async () => {
    clubService.clearAuth();
    await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    await clubService.deleteAllClubs();
    await clubService.deleteAllUsers();
    user = await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      clubs[i] = await clubService.createClub(testClubs[i], user._id);
    }
  });

  teardown(async () => {
    // Cleanup after tests
  });

  test("create a club", async () => {
    const newClub = await clubService.createClub(testClub, user._id);
    assertSubset(testClub, newClub);
    assert.isDefined(newClub._id);
    assert.equal(newClub.userId, user._id);
  });

  test("delete all clubs", async () => {
    let returnedClubs = await clubService.getAllClubs();
    assert.equal(returnedClubs.length, 3);
    await clubService.deleteAllClubs();
    returnedClubs = await clubService.getAllClubs();
    assert.equal(returnedClubs.length, 0);
  });

  test("get a club", async () => {
    const returnedClub = await clubService.getClub(clubs[0]._id);
    assert.deepEqual(clubs[0], returnedClub);
  });

  test("update a club", async () => {
    const clubToUpdate = await clubService.createClub(testClub, user._id);
    const updatedClub = { ...clubToUpdate, ...updatedTestClub } as Club;
    const returnedClub = await clubService.updateClub(updatedClub);
    assertSubset(updatedClub, returnedClub);
    assert.deepEqual(returnedClub.imageUrls, updatedTestClub.imageUrls);
    assert.equal(returnedClub.category, updatedTestClub.category);
  });


  test("get a club - bad id", async () => {
    try {
      const returnedClub = await clubService.getClub("1234");
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No Club with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a club - deleted club", async () => {
    await clubService.deleteAllClubs();
    try {
      const returnedClub = await clubService.getClub(clubs[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No Club with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get clubs by user", async () => {
    const userClubs = await clubService.getClubsByUser(user._id);
    assert.equal(userClubs.length, 3);
    userClubs.forEach((club: Club) => {
      assert.equal(club.userId, user._id);
    });
  });

  test("update a club", async () => {
    const clubToUpdate = { ...clubs[0] };
    clubToUpdate.name = "Updated Club Name";
    clubToUpdate.description = "Updated description";
    
    const updatedClub = await clubService.updateClub(clubToUpdate);
    assert.equal(updatedClub.name, "Updated Club Name");
    assert.equal(updatedClub.description, "Updated description");
    assert.equal(updatedClub._id, clubs[0]._id);
  });

  test("delete one club", async () => {
    await clubService.deleteClub(clubs[0]._id);
    const returnedClubs = await clubService.getAllClubs();
    assert.equal(returnedClubs.length, clubs.length - 1);
    try {
      await clubService.getClub(clubs[0]._id);
      assert.fail("Should not return a response");
    } catch (error: any) {
      assert(error.response.data.message === "No Club with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
