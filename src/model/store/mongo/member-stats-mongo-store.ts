import { Schema, model } from "mongoose";
import type { MemberStats, NewMemberStats } from "../../interface/member-stats.js";

const memberStatsSchema = new Schema<MemberStats>({
  clubId: { type: String, ref: "Club", required: true },
  total: Number,
  adultMale: Number,
  adultFemale: Number,
  youthMale: Number,
  youthFemale: Number,
  date: Date,
});

const MemberStatsMongoose = model<MemberStats>("MemberStats", memberStatsSchema);

export const memberStatsMongoStore = {
  async getAll(): Promise<MemberStats[]> {
    const stats = await MemberStatsMongoose.find().lean();
    return stats.map((s: any) => ({ ...s, _id: s._id.toString() }));
  },

  async getByClubId(clubId: string): Promise<MemberStats[]> {
    const stats = await MemberStatsMongoose.find({ clubId }).lean();
    return stats.map((s: any) => ({ ...s, _id: s._id.toString() }));
  },

  async create(stats: NewMemberStats): Promise<MemberStats> {
    const newStats = new MemberStatsMongoose(stats);
    await newStats.save();
    return { ...newStats.toObject(), _id: newStats._id.toString() };
  },

  async deleteAll(): Promise<void> {
    await MemberStatsMongoose.deleteMany({});
  }
};