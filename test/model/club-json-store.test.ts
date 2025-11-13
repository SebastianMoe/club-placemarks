import { suite, test, setup } from "mocha";
import { assert } from "chai";
import { db } from "../../src/model/db.ts";
import { maggie, testClub, testClubs } from "../fixtures.ts";
import { assertSubset } from "../test-utils.ts";
import type { Club } from "../../src/model/interface/club.ts";
import type { User } from "../../src/model/interface/user.ts";

suite("Club Model tests", () => {
  let createdClubs: Club[] = [];
  let testUser: User;

  setup(async () => {
    db.init("json");
    await db.clubStore!.deleteAll();
    await db.userStore!.deleteAll();
    createdClubs = [];
    
    // Create a test user first
    testUser = await db.userStore!.create(maggie);
    
    // Create test clubs
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const club = await db.clubStore!.create(testClubs[i], testUser._id);
      createdClubs.push(club);
    }
  });

  test("create a club", async () => {
    const newClub = await db.clubStore!.create(testClub, testUser._id);
    assertSubset(testClub, newClub);
    assert.isDefined(newClub._id);
    assert.equal(newClub.userId, testUser._id);
  });

  test("delete all clubs", async () => {
    let returnedClubs = await db.clubStore!.getAll();
    assert.equal(returnedClubs.length, 3);
    await db.clubStore!.deleteAll();
    returnedClubs = await db.clubStore!.getAll();
    assert.equal(returnedClubs.length, 0);
  });

  test("get a club - success", async () => {
    const club = await db.clubStore!.create(testClub, testUser._id);
    const returnedClub = await db.clubStore!.getById(club._id);
    assert.deepEqual(club, returnedClub);
  });

  test("get clubs by user id", async () => {
    const userClubs = await db.clubStore!.getByUserId(testUser._id);
    assert.equal(userClubs.length, createdClubs.length);
    userClubs.forEach((club) => {
      assert.equal(club.userId, testUser._id);
    });
  });

  test("delete one club - success", async () => {
    await db.clubStore!.deleteById(createdClubs[0]._id);
    const returnedClubs = await db.clubStore!.getAll();
    assert.equal(returnedClubs.length, createdClubs.length - 1);
    const deletedClub = await db.clubStore!.getById(createdClubs[0]._id);
    assert.isNull(deletedClub);
  });

  test("get a club - failures", async () => {
    const noClubWithId = await db.clubStore!.getById("123");
    assert.isNull(noClubWithId);
  });

  test("get a club - bad params", async () => {
    let nullClub = await db.clubStore!.getById("");
    assert.isNull(nullClub);
    nullClub = await db.clubStore!.getById("");
    assert.isNull(nullClub);
  });

  test("delete one club - fail", async () => {
    await db.clubStore!.deleteById("bad-id");
    const allClubs = await db.clubStore!.getAll();
    assert.equal(createdClubs.length, allClubs.length);
  });

  test("update a club - success", async () => {
    const clubToUpdate = { ...createdClubs[0] };
    clubToUpdate.name = "Updated Club Name";
    clubToUpdate.description = "Updated description";
    
    const updatedClub = await db.clubStore!.update(clubToUpdate);
    assert.isNotNull(updatedClub);
    assert.equal(updatedClub!.name, "Updated Club Name");
    assert.equal(updatedClub!.description, "Updated description");
  });

  test("update a club - fail", async () => {
    const fakeClub: Club = {
      _id: "fake-id",
      name: "Fake Club",
      description: null,
      latitude: null,
      longitude: null,
      imageUrls: null,
      userId: testUser._id,
    };
    
    const updatedClub = await db.clubStore!.update(fakeClub);
    assert.isNull(updatedClub);
  });
});
