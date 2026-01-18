import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";

export const memberStatsApi = {
  create: {
    auth: false, 
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
  },

  findByClub: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const stats = await db.memberStatsStore.getByClubId(request.params.id);
        return stats;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
  deleteAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
        try {
            await db.memberStatsStore.deleteAll();
            return h.response().code(204);
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    }
  },

  deleteOne: {
    auth: false,
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
    }
  }
};