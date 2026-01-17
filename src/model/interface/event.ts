export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: string;
  attendees: number; 
  latitude: number; 
  longitude: number; 
  clubId: string; 
}