import mongoose from "mongoose";
import dotenv from "dotenv";
import type { NewUser, User } from "./interface/user.js";
import type { NewClub, Club } from "./interface/club.js";
import type { NewMemberStats, MemberStats } from "./interface/member-stats.js";
import { userJsonStore } from "./store/json/user-json-store.js";
import { clubJsonStore } from "./store/json/club-json-store.js";
import { userMongoStore } from "./store/mongo/user-mongo-store.js";
import { clubMongoStore } from "./store/mongo/club-mongo-store.js";
import { memberStatsMongoStore } from "./store/mongo/member-stats-mongo-store.js"; 

dotenv.config();

type StoreType = "json" | "mongo";

export interface UserStore {
  getAll(): Promise<User[]>;

  getById(userId: User["_id"]): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  create(newUser: NewUser): Promise<User>;

  update(user: User): Promise<User | null>;

  deleteAll(): Promise<User[]>;

  deleteById(userId: User["_id"]): Promise<User | null>;
}

export interface ClubStore {
  getAll(): Promise<Club[]>;

  getById(clubId: Club["_id"]): Promise<Club | null>;

  getByUserId(userId: string): Promise<Club[]>;

  create(newClub: NewClub, userId: string): Promise<Club>;

  update(club: Club): Promise<Club | null>;

  deleteAll(): Promise<Club[]>;

  deleteById(clubId: Club["_id"]): Promise<Club | null>;
}

export interface MemberStatsStore {
  getAll(): Promise<MemberStats[]>;

  getByClubId(clubId: string): Promise<MemberStats[]>;

  create(stats: NewMemberStats): Promise<MemberStats>;

  deleteAll(): Promise<void>;

  deleteById(id: MemberStats["_id"]): Promise<MemberStats | null>;
}

interface DataBase {
  userStore: UserStore | null;
  clubStore: ClubStore | null;
  memberStatsStore: MemberStatsStore | null;

  init(storeType: StoreType): Promise<void>;
}

export const dataBase: DataBase = {
  userStore: null,
  clubStore: null,
  memberStatsStore: null,

  async init(storeType: StoreType) {
    if (storeType === "json") {
      this.userStore = userJsonStore;
      this.clubStore = clubJsonStore;
    } else if (storeType === "mongo") {
      this.userStore = userMongoStore;
      this.clubStore = clubMongoStore;
      this.memberStatsStore = memberStatsMongoStore;
      if (process.env.MONGO_URL) {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
      } else {
        console.error("Missing MONGO_URL environment variable");
      }
    } else {
      throw new Error(`unknown storeType ${storeType}`);
    }
  },
};

export const db = dataBase;