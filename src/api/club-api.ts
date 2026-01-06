import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import type { NewClub, Club } from "../model/interface/club.js";

export const clubApi = {
  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const clubs = await db.clubStore.getAll();
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const club = await db.clubStore.getById(request.params.id);
        if (!club) {
          return Boom.notFound("No Club with this id");
        }
        return club;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByUser: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const clubs = await db.clubStore.getByUserId(request.params.userId);
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const payload = request.payload as NewClub & { userId: string };
        const club = await db.clubStore.create(payload, payload.userId);
        if (club) {
          return h.response(club).code(201);
        }
        return Boom.badImplementation("Error creating club");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const club = request.payload as Club;
        const updatedClub = await db.clubStore.update(club);
        if (!updatedClub) {
          return Boom.notFound("No Club with this id");
        }
        return updatedClub;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const club = await db.clubStore.deleteById(request.params.id);
        if (!club) {
          return Boom.notFound("No Club with this id");
        }
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.clubStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
