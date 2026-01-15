export interface MemberStats {
  _id: string;
  clubId: string;
  total: number;
  adultMale: number;
  adultFemale: number;
  youthMale: number;
  youthFemale: number;
  date: Date;
}

export type NewMemberStats = Omit<MemberStats, "_id">;