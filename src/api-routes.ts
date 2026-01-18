import type { ServerRoute } from "@hapi/hapi";
import { userApi } from "./api/user-api.js";
import { clubApi } from "./api/club-api.js";
import { eventApi } from "./api/event-api.js";
import { memberStatsApi } from "./api/member-stats-api.js";
import { createMemberStatsSchema } from "./api/joi-schemas.js";

export const apiRoutes: ServerRoute[] = [
  // User API routes
  {
    method: "GET",
    path: "/api/users",
    options: { tags: ["api"] },
    handler: userApi.find.handler,
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    options: { tags: ["api"] },
    handler: userApi.findOne.handler,
  },
  {
    method: "POST",
    path: "/api/users",
    options: { auth: false, tags: ["api"] },
    handler: userApi.create.handler,
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    options: { tags: ["api"] },
    handler: userApi.deleteOne.handler,
  },
  {
    method: "DELETE",
    path: "/api/users",
    options: { tags: ["api"] },
    handler: userApi.deleteAll.handler,
  },
  {
    method: "POST",
    path: "/api/users/authenticate",
    options: { auth: false, tags: ["api"] },
    handler: userApi.authenticate.handler,
  },

  // Club API routes
  {
    method: "GET",
    path: "/api/clubs",
    options: { tags: ["api"] },
    handler: clubApi.find.handler,
  },
  {
    method: "GET",
    path: "/api/clubs/{id}",
    options: { tags: ["api"] },
    handler: clubApi.findOne.handler,
  },
  {
    method: "GET",
    path: "/api/users/{userId}/clubs",
    options: { tags: ["api"] },
    handler: clubApi.findByUser.handler,
  },
  {
    method: "POST",
    path: "/api/clubs",
    options: {
      tags: ["api"],
      payload: {
        multipart: true, 
        output: "stream",  
        maxBytes: 200000000,
        parse: true,
        allow: "multipart/form-data"
      },
    },
    handler: clubApi.create.handler,
  },
  {
    method: "PUT",
    path: "/api/clubs/{id}",
    options: {
      tags: ["api"],
      payload: {
        multipart: true,
        output: "stream",
        parse: true,
        maxBytes: 209715200,
        allow: "multipart/form-data"
      }
    },
    handler: clubApi.update.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{id}",
    options: { tags: ["api"] },
    handler: clubApi.deleteOne.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs",
    options: { tags: ["api"] },
    handler: clubApi.deleteAll.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{id}/image", 
    options: {
      tags: ["api"],
    },
    handler: clubApi.deleteImage.handler,
  },

  // Member Stats API routes
  {
    method: "POST",
    path: "/api/clubs/{id}/stats",
    options: {
      tags: ["api"],
      validate: {
        payload: createMemberStatsSchema
      }
    },
    handler: memberStatsApi.create.handler,
  },
  {
    method: "GET",
    path: "/api/clubs/{id}/stats",
    options: { tags: ["api"]},
    handler: memberStatsApi.findByClub.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{clubId}/stats/{id}", 
    options: { tags: ["api"] },
    handler: memberStatsApi.deleteAll.handler,
  },

  // Event API Routes
  {
    method: "GET",
    path: "/api/events",
    options: { tags: ["api"] },
    handler: eventApi.find.handler,
  },
  {
    method: "GET",
    path: "/api/clubs/{clubId}/events", // Events pro Club
    options: { tags: ["api"] },
    handler: eventApi.findByClub.handler,
  },
  {
    method: "POST",
    path: "/api/events",
    options: { tags: ["api"] },
    handler: eventApi.create.handler,
  },
  {
    method: "DELETE",
    path: "/api/events/{id}",
    options: { tags: ["api"] },
    handler: eventApi.deleteOne.handler,
  },
];