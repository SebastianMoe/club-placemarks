import type { NewUser, User } from "./interface/user.js";
import type { NewClub, Club } from "./interface/club.js";
import { userJsonStore } from "./store/json/user-json-store.js";
import { clubJsonStore } from "./store/json/club-json-store.js";

type StoreType = "json";

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

interface DataBase {
  userStore: UserStore | null;
  clubStore: ClubStore | null;

  init(storeType: StoreType): void;
}

export const dataBase: DataBase = {
  userStore: null,
  clubStore: null,

  init(storeType: StoreType) {
    if (storeType === "json") {
      this.userStore = userJsonStore;
      this.clubStore = clubJsonStore;
    } else {
      throw new Error(`unknown storeType ${storeType}`);
    }
  },
};

// Alias for shorter access
export const db = dataBase;