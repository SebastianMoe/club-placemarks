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
    return stats;
  },

  async getByClubId(clubId: string): Promise<MemberStats[]> {
    const stats = await MemberStatsMongoose.find({ clubId }).lean();
    return stats;
  },

  async create(stats: NewMemberStats): Promise<MemberStats> {
    const newStats = new MemberStatsMongoose(stats);
    await newStats.save();
    return newStats;
  },

  async deleteAll(): Promise<void> {
    await MemberStatsMongoose.deleteMany({});
  },

  async deleteById(id: string): Promise<MemberStats | null> {
    const stat = await MemberStatsMongoose.findByIdAndDelete(id).lean();
    if (!stat) return null;
    return stat;
  }
};