import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { eventMongoStore } from "../model/store/mongo/event-mongo-store.js";
import { EventSpec, EventSpecPlus, IdSpec, EventArray } from "./joi-schemas.js";

export const eventApi = {
  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const events = await eventMongoStore.getAll();
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Get all events",
        response: { schema: EventArray, failAction: "ignore" },
    }
  },

  findByClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const events = await eventMongoStore.getByClubId(request.params.clubId);
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Get events for a club",
        validate: { params: { clubId: IdSpec }, failAction: "ignore" },
    }
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const event = request.payload as any;
        const newEvent = await eventMongoStore.add(event);
        return h.response(newEvent).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Create an event",
        validate: { payload: EventSpec, failAction: "ignore" },
        response: { schema: EventSpecPlus, failAction: "ignore" },
    }
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await eventMongoStore.delete(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete an event",
        validate: { params: { id: IdSpec }, failAction: "ignore" },
    }
  },
  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await eventMongoStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete all events",
    }
  },
};