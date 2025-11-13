import { v4 } from "uuid";
import type { ClubStore } from "../../db.js";
import { jsonFile } from "./store-utils.js";
import type { NewClub, Club } from "../../interface/club.js";

export const clubJsonStore: ClubStore = {
  async getAll(): Promise<Club[]> {
    await jsonFile.read();
    return jsonFile.data.clubs;
  },

  async getById(clubId: Club["_id"]): Promise<Club | null> {
    await jsonFile.read();
    const foundClub = jsonFile.data.clubs.find((c: Club) => c._id === clubId);
    return foundClub ?? null;
  },

  async getByUserId(userId: string): Promise<Club[]> {
    await jsonFile.read();
    return jsonFile.data.clubs.filter((c: Club) => c.userId === userId);
  },

  async create(newClub: NewClub, userId: string): Promise<Club> {
    await jsonFile.read();
    const club: Club = { 
      ...newClub, 
      _id: v4(), 
      userId,
      description: newClub.description || null,
      imageUrls: newClub.imageUrls || null
    } as Club;
    jsonFile.data.clubs.push(club);
    await jsonFile.write();
    return club;
  },

  async update(club: Club): Promise<Club | null> {
    await jsonFile.read();
    const index = jsonFile.data.clubs.findIndex((c: Club) => c._id === club._id);
    if (index === -1) {
      return null;
    }
    jsonFile.data.clubs[index] = club;
    await jsonFile.write();
    return club;
  },

  async deleteAll(): Promise<Club[]> {
    await jsonFile.read();
    const foundClubs = jsonFile.data.clubs;
    jsonFile.data.clubs = [];
    await jsonFile.write();
    return foundClubs;
  },

  async deleteById(clubId: Club["_id"]): Promise<Club | null> {
    await jsonFile.read();
    const index = jsonFile.data.clubs.findIndex((c: Club) => c._id === clubId);
    if (index === -1) return null;
    const club: Club = jsonFile.data.clubs[index];
    jsonFile.data.clubs.splice(index, 1);
    await jsonFile.write();
    return club;
  },
};
