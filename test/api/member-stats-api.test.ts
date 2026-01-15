import { suite, test, setup, teardown } from "mocha";
import { assert } from "chai";
import { maggie, testClub, testStats } from "../fixtures.ts";
import { clubService } from "./api-service.ts";
import type { User } from "../../src/model/interface/user.ts";
import type { Club } from "../../src/model/interface/club.ts";

suite("Member Stats API tests", () => {
  let user: User | null = null;
  let club: Club | null = null;

  setup(async () => {
    clubService.clearAuth();
    await clubService.deleteAllUsers();
    await clubService.deleteAllClubs();
    await clubService.deleteAllStats(); // Neu

    user = await clubService.createUser(maggie);
    await clubService.authenticate(maggie);
    if (!user) throw new Error("User not created");
    club = await clubService.createClub(testClub, user._id);
  });

  teardown(async () => {
    // Cleanup
  });

  test("create member stats", async () => {
    if (!club) throw new Error("Club not created");
    const returnedStats = await clubService.createMemberStats(club._id, testStats);
    assert.isDefined(returnedStats._id);
    assert.equal(returnedStats.total, testStats.total);
    assert.equal(returnedStats.clubId, club._id);
  });

  test("get member stats for club", async () => {
    if (!club) throw new Error("Club not created");
    await clubService.createMemberStats(club._id, testStats);
    const statsList = await clubService.getMemberStats(club._id);
    assert.equal(statsList.length, 1);
    assert.equal(statsList[0].total, testStats.total);
  });
});