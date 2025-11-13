import type { NewUser, User } from "../src/model/interface/user.ts";

export const maggie: NewUser = {
    "email": "ted.mosby@newyork.com",
    "password": "architect123",
    "firstName": "Ted",
    "lastName": "Mosby",
};

export const testUsers: NewUser[] = [
  {
    "email": "ted.mosby@newyork.com",
    "password": "architect123",
    "firstName": "Ted",
    "lastName": "Mosby",
  },
  {
    "email": "barny.stinson@newyork.com",
    "password": "suitUp456",
    "firstName": "Barny",
    "lastName": "Stinson",
  },
  {
    "email": "robin.scherbatsky@newyork.com",
    "password": "canadian789",
    "firstName": "Robin",
    "lastName": "Scherbatsky",
  }
];