import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import { IdSpec, MemberStatsArray, MemberStatsSpec, MemberStatsSpecPlus } from "./joi-schemas.js";

export const memberStatsApi = {
  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const statsData = request.payload as any;
        const clubId = request.params.id; 
        
        const newStats = await db.memberStatsStore.create({
            ...statsData,
            clubId: clubId
        });
        
        return h.response(newStats).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Create Member Stats",
        validate: { payload: MemberStatsSpec, params: { id: IdSpec }, failAction: "ignore" },
        response: { schema: MemberStatsSpecPlus, failAction: "ignore" },
    }
  },

  findByClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const stats = await db.memberStatsStore.getByClubId(request.params.id);
        return stats;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Get Member Stats by Club",
        validate: { params: { id: IdSpec }, failAction: "ignore" },
        response: { schema: MemberStatsArray, failAction: "ignore" },
    }
  },
  
  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
        try {
            await db.memberStatsStore.deleteAll();
            return h.response().code(204);
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete all Member Stats",
    }
  },

  deleteOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
        try {
            const memberStat =await db.memberStatsStore.deleteById(request.params.id);
            if (!memberStat) {
              return Boom.notFound("No Member Stat with this id");
            }
            return h.response().code(204);
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    },
    options: {
        auth: { strategy: "jwt" },
        tags: ["api"],
        description: "Delete Member Stats by ID",
        validate: { params: { id: IdSpec }, failAction: "ignore" },
    }
  }
};