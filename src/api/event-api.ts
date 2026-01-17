import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { eventMongoStore } from "../model/store/mongo/event-mongo-store.js";

export const eventApi = {
  find: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const events = await eventMongoStore.getAll();
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all events",
  },

  findByClub: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const events = await eventMongoStore.getByClubId(request.params.clubId);
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get events for a club",
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const event = request.payload as any;
        const newEvent = await eventMongoStore.add(event);
        return h.response(newEvent).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an event",
  },

  deleteOne: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await eventMongoStore.delete(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete an event",
  },
};