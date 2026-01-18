import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import type { NewClub, Club } from "../model/interface/club.js";
import { ClubArray, ClubSpec, ClubSpecPlus, IdSpec } from "./joi-schemas.js";
import { imageStore } from "../model/store/image-store.js";

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
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Get all clubs",
        notes: "Returns all clubs",
        response: { schema: ClubArray, failAction: "ignore" },
    }
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
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Find a Club",
        notes: "Returns a club",
        validate: { params: { id: IdSpec }, failAction: "ignore" },
        response: { schema: ClubSpecPlus, failAction: "ignore" },
    }
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
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Find Clubs by User",
        notes: "Returns all clubs for a user",
        validate: { params: { userId: IdSpec }, failAction: "ignore" },
        response: { schema: ClubArray, failAction: "ignore" },
    }
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const payload = request.payload as any;
        
        const imageUrls: string[] = [];
        
        if (payload.image) {
            const files = Array.isArray(payload.image) ? payload.image : [payload.image];
            for (let i = 0; i < files.length; i += 1) {
                const file = files[i];
                
                // eslint-disable-next-line no-await-in-loop
                const url = await imageStore.uploadImage(file);
                
                if (url) {
                    imageUrls.push(url);
                }
            }
        }

        const newClubData = {
            name: payload.name,
            description: payload.description,
            category: payload.category,
            latitude: Number(payload.latitude), 
            longitude: Number(payload.longitude),
            imageUrls: imageUrls, 
            userId: payload.userId 
        };

        const club = await db.clubStore.create(newClubData, payload.userId);
        
        if (club) {
          return h.response(club).code(201);
        }
        return Boom.badImplementation("Error creating club");
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Create a Club",
        notes: "Returns the newly created club",
        validate: { payload: ClubSpec, failAction: "ignore" },
        response: { schema: ClubSpecPlus, failAction: "ignore" },
         payload: {
            multipart: true,
            output: "data",
            maxBytes: 200000000,
            parse: true,
            allow: ["application/json", "multipart/form-data"]
        },
    }
  },

  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const { id } = request.params;
        const payload = request.payload as any;
        
        const existingClub = await db.clubStore.getById(id);
        if (!existingClub) {
            return Boom.notFound("Club not found");
        }

        const newImageUrls: string[] = [];
        if (payload.image) {
            const files = Array.isArray(payload.image) ? payload.image : [payload.image];
            for (let i = 0; i < files.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                const url = await imageStore.uploadImage(files[i]);
                if (url) newImageUrls.push(url);
            }
        }

        let currentImages = existingClub.imageUrls || [];
        if (payload.imageUrls !== undefined) {
             currentImages = Array.isArray(payload.imageUrls) ? payload.imageUrls : [payload.imageUrls];
        }

        const updatedImages = [...currentImages, ...newImageUrls];

        const updatedClubData = {
            name: payload.name,
            description: payload.description,
            category: payload.category,
            latitude: Number(payload.latitude),
            longitude: Number(payload.longitude),
            imageUrls: updatedImages, 
            _id: id
        };

        const updatedClub = await db.clubStore.update(updatedClubData as any);
        return updatedClub;

      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Update a Club",
        notes: "Returns the updated club",
        validate: { payload: ClubSpecPlus, failAction: "ignore" },
        response: { schema: ClubSpecPlus, failAction: "ignore" },
        payload: {
            multipart: true,
            output: "data",
            parse: true,
            maxBytes: 209715200,
            allow: ["application/json", "multipart/form-data"]
        }
    }
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
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete a Club",
        notes: "Returns 204 if successful",
        validate: { params: { id: IdSpec }, failAction: "ignore" },
    }
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
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete all clubs",
        notes: "Returns 204 if successful",
    }
  },
  
  deleteImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const { id } = request.params;
        const { url } = request.payload as { url: string }; 

        const club = await db.clubStore.getById(id);
        if (!club) return Boom.notFound("Club not found");

        const publicId = url.split("/").pop()?.split(".")[0];
        if (publicId) {
            await imageStore.deleteImage(publicId);
        }

        club.imageUrls = club.imageUrls?.filter((img) => img !== url) || [];

        await db.clubStore.update(club);

        return h.response().code(204);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete an image from a club",
    }
  }
};
