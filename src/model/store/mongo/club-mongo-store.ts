import { Schema, model } from "mongoose";
import type { Club, NewClub } from "../../interface/club.js";
import type { ClubStore } from "../../db.js";

const clubSchema = new Schema<Club>({
  name: { type: String, required: true },
  description: String,
  latitude: Number,
  longitude: Number,
  imageUrls: [String],
  userId: {
    type: String, // Storing reference as string to match User._id string type in interface
    ref: "User",
  },
});

const ClubMongoose = model<Club>("Club", clubSchema);

export const clubMongoStore: ClubStore = {
  async getAll(): Promise<Club[]> {
    const clubs = await ClubMongoose.find().lean();
    return clubs.map((c: any) => ({ ...c, _id: c._id.toString() })) as Club[];
  },

  async getById(clubId: string): Promise<Club | null> {
    const club = await ClubMongoose.findOne({ _id: clubId }).lean();
    if (!club) return null;
    return { ...club, _id: club._id.toString() } as Club;
  },

  async getByUserId(userId: string): Promise<Club[]> {
    const clubs = await ClubMongoose.find({ userId }).lean();
    return clubs.map((c: any) => ({ ...c, _id: c._id.toString() })) as Club[];
  },

  async create(newClub: NewClub, userId: string): Promise<Club> {
    const club = new ClubMongoose({ ...newClub, userId });
    await club.save();
    return { ...club.toObject(), _id: club._id.toString() } as Club;
  },

  async update(club: Club): Promise<Club | null> {
    const { _id, ...updateData } = club;
    const updatedClub = await ClubMongoose.findOneAndUpdate({ _id: _id }, updateData, { new: true }).lean();
    if (!updatedClub) return null;
    return { ...updatedClub, _id: updatedClub._id.toString() } as Club;
  },

  async deleteAll(): Promise<Club[]> {
    const allClubs = await this.getAll();
    await ClubMongoose.deleteMany({});
    return allClubs;
  },

  async deleteById(clubId: string): Promise<Club | null> {
    const club = await this.getById(clubId);
    if (!club) return null;
    await ClubMongoose.deleteOne({ _id: clubId });
    return club;
  }
};
