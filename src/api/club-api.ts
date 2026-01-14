import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import type { NewClub, Club } from "../model/interface/club.js";
import { ClubArray, ClubSpec, ClubSpecPlus, IdSpec } from "./joi-schemas.js";
import { imageStore } from "../model/store/image-store.js";

export const clubApi = {
  find: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const clubs = await db.clubStore.getAll();
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all clubs",
    notes: "Returns all clubs",
    response: { schema: ClubArray, failAction: "ignore" },
  },

  findOne: {
    auth: false,
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
    tags: ["api"],
    description: "Find a Club",
    notes: "Returns a club",
    validate: { params: { id: IdSpec }, failAction: "ignore" },
    response: { schema: ClubSpecPlus, failAction: "ignore" },
  },

  findByUser: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const clubs = await db.clubStore.getByUserId(request.params.userId);
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Find Clubs by User",
    notes: "Returns all clubs for a user",
    validate: { params: { userId: IdSpec }, failAction: "ignore" },
    response: { schema: ClubArray, failAction: "ignore" },
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const payload = request.payload as any;
        
        let imageUrl = "";
        
        if (payload.image) {
            const url = await imageStore.uploadImage(payload.image);
            if (url) {
                imageUrl = url;
            }
        }

        const newClubData = {
            name: payload.name,
            description: payload.description,
            category: payload.category,
            latitude: Number(payload.latitude), 
            longitude: Number(payload.longitude),
            imageUrls: imageUrl ? [imageUrl] : [], 
            userId: payload.userId 
        };

        const club = await db.clubStore.create(newClubData, payload.userId);
        
        if (club) {
          return h.response(club).code(201);
        }
        return Boom.badImplementation("Error creating club");
      } catch (err) {
        console.log(err); // Debugging
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  update: {
    auth: false,
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
    tags: ["api"],
    description: "Update a Club",
    notes: "Returns the updated club",
    validate: { payload: ClubSpecPlus, failAction: "ignore" },
    response: { schema: ClubSpecPlus, failAction: "ignore" },
  },

  deleteOne: {
    auth: false,
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
    tags: ["api"],
    description: "Delete a Club",
    notes: "Returns 204 if successful",
    validate: { params: { id: IdSpec }, failAction: "ignore" },
  },

  deleteAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.clubStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all clubs",
    notes: "Returns 204 if successful",
  },
};
