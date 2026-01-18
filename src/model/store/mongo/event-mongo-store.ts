import { Schema, model } from "mongoose";
import type { Event } from "../../interface/event.js";

const eventSchema = new Schema<Event>({
  title: { type: String, required: true },
  description: String,
  date: String,
  attendees: Number,
  latitude: Number,
  longitude: Number,
  clubId: {
    type: String,
    ref: "Club",
  },
});

const EventMongoose = model<Event>("Event", eventSchema);

export const eventMongoStore = {
  async getAll(): Promise<Event[]> {
    const events = await EventMongoose.find().lean();
    return events;
  },

  async getByClubId(clubId: string): Promise<Event[]> {
    const events = await EventMongoose.find({ clubId }).lean();
    return events;
  },

  async add(event: Event): Promise<Event> {
    const newEvent = new EventMongoose(event);
    await newEvent.save();
    return newEvent;
  },

  async delete(id: string) {
    await EventMongoose.deleteOne({ _id: id });
  },
  
  async deleteAll() {
    await EventMongoose.deleteMany({});
  }
};