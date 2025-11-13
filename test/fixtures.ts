import type { NewUser, User } from "../src/model/interface/user.ts";

export const maggie: NewUser = {
  email: "maggie.simpson@springfield.com",
  password: "pacifier999",
  firstName: "Maggie",
  lastName: "Simpson",
};

export const testUsers: User[] = [
  {
    _id: "",
    email: "homer.simpson@springfield.com",
    password: "duffBeer123",
    firstName: "Homer",
    lastName: "Simpson",
    aboutMe: null,
    imageUrl: null,
  },
  {
    _id: "",
    email: "marge.simpson@springfield.com",
    password: "blueHair456",
    firstName: "Marge",
    lastName: "Simpson",
    aboutMe: null,
    imageUrl: null,
  },
  {
    _id: "",
    email: "bart.simpson@springfield.com",
    password: "eatMyShorts789",
    firstName: "Bart",
    lastName: "Simpson",
    aboutMe: null,
    imageUrl: null,
  },
];
