import type { NewUser, User } from "./interface/user.js";
import { userJsonStore } from "./store/json/user-json-store.js";

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

interface DataBase {
  userStore: UserStore | null;

  init(storeType: StoreType): void;
}

export const dataBase: DataBase = {
  userStore: null,

  init(storeType: StoreType) {
    if (storeType === "json") {
      this.userStore = userJsonStore;
    } else {
      throw new Error(`unknown storeType ${storeType}`);
    }
  },
};

// Alias for shorter access
export const db = dataBase;