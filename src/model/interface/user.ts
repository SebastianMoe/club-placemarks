export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  aboutMe: string | null;
  imageUrl: string | null;
  scope: string[];
}

export type NewUser = Omit<User, "_id" | "aboutMe" | "imageUrl" | "scope">;