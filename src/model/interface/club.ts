export interface Club {
  _id: string;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string;
  imageUrls: string[] | null;
  userId: string;
}

export type NewClub = Omit<Club, "_id" | "userId"> & { imageUrl?: string };