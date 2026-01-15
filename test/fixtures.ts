import type { NewUser, User } from "../src/model/interface/user.ts";
import type { NewClub, Club } from "../src/model/interface/club.ts";
import type { NewMemberStats } from "../src/model/interface/member-stats.js";

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

export const testClub: NewClub = {
  name: "DLRG Regensburg",
  description: "Deutsche Lebens-Rettungs-Gesellschaft Ortsgruppe Regensburg",
  latitude: 49.0195,
  longitude: 12.0974,
  category: "test",
  imageUrls: [],
};

export const testClubs: NewClub[] = [
  {
    name: "DLRG Regensburg",
    description: "Deutsche Lebens-Rettungs-Gesellschaft Ortsgruppe Regensburg",
    latitude: 49.0195,
    longitude: 12.0974,
    category: "test",
    imageUrls: [],
  },
  {
    name: "DLRG Amberg",
    description: "Deutsche Lebens-Rettungs-Gesellschaft Ortsgruppe Amberg",
    latitude: 49.4447,
    longitude: 11.8583,
    category: "test",
    imageUrls: [],
  },
  {
    name: "DLRG Furth im Wald",
    description: "Deutsche Lebens-Rettungs-Gesellschaft Ortsgruppe Furth im Wald",
    latitude: 49.3089,
    longitude: 12.8447,
    category: "test",
    imageUrls: [],
  },
];

export const updatedTestClub = {
  name: "DLRG Regensburg Updated",
  description: "Updated Description",
  latitude: 50.0,
  longitude: 13.0,
  category: "rescue",
  imageUrls: ["http://example.com/image.png"]
};

export const testStats: NewMemberStats = {
    clubId: "test-club-id",
    total: 100,
    adultMale: 40,
    adultFemale: 40,
    youthMale: 10,
    youthFemale: 10,
    date: new Date("2023-01-01")
};