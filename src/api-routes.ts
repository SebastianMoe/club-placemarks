import type { ServerRoute, RouteOptions } from "@hapi/hapi";
import { userApi } from "./api/user-api.js";
import { clubApi } from "./api/club-api.js";
import { eventApi } from "./api/event-api.js";
import { memberStatsApi } from "./api/member-stats-api.js";

export const apiRoutes: ServerRoute[] = [
  // User API routes
  {
    method: "GET",
    path: "/api/users",
    handler: userApi.find.handler,
    options: userApi.find.options as RouteOptions,
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    handler: userApi.findOne.handler,
    options: userApi.findOne.options as RouteOptions,
  },
  {
    method: "POST",
    path: "/api/users",
    handler: userApi.create.handler,
    options: userApi.create.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/users/{id}",
    handler: userApi.deleteOne.handler,
    options: userApi.deleteOne.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/users",
    handler: userApi.deleteAll.handler,
    options: userApi.deleteAll.options as RouteOptions,
  },
  {
    method: "POST",
    path: "/api/users/authenticate",
    handler: userApi.authenticate.handler,
    options: userApi.authenticate.options as RouteOptions,
  },

  // Club API routes
  {
    method: "GET",
    path: "/api/clubs",
    handler: clubApi.find.handler,
    options: clubApi.find.options as RouteOptions,
  },
  {
    method: "GET",
    path: "/api/clubs/{id}",
    handler: clubApi.findOne.handler,
    options: clubApi.findOne.options as RouteOptions,
  },
  {
    method: "GET",
    path: "/api/users/{userId}/clubs",
    handler: clubApi.findByUser.handler,
    options: clubApi.findByUser.options as RouteOptions,
  },
  {
    method: "POST",
    path: "/api/clubs",
    handler: clubApi.create.handler,
    options: clubApi.create.options as RouteOptions,
  },
  {
    method: "PUT",
    path: "/api/clubs/{id}",
    handler: clubApi.update.handler,
    options: clubApi.update.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{id}",
    handler: clubApi.deleteOne.handler,
    options: clubApi.deleteOne.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/clubs",
    handler: clubApi.deleteAll.handler,
    options: clubApi.deleteAll.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{id}/image", 
    handler: clubApi.deleteImage.handler,
    options: clubApi.deleteImage.options as RouteOptions,
  },

  // Member Stats API routes
  {
    method: "POST",
    path: "/api/clubs/{id}/stats",
    handler: memberStatsApi.create.handler,
    options: memberStatsApi.create.options as RouteOptions,
  },
  {
    method: "GET",
    path: "/api/clubs/{id}/stats",
    handler: memberStatsApi.findByClub.handler,
    options: memberStatsApi.findByClub.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{clubId}/stats/{id}", 
    handler: memberStatsApi.deleteOne.handler,
    options: memberStatsApi.deleteOne.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/member-stats",
    handler: memberStatsApi.deleteAll.handler,
    options: memberStatsApi.deleteAll.options as RouteOptions,
  },

  // Event API Routes
  {
    method: "GET",
    path: "/api/events",
    handler: eventApi.find.handler,
    options: eventApi.find.options as RouteOptions,
  },
  {
    method: "GET",
    path: "/api/clubs/{clubId}/events", 
    handler: eventApi.findByClub.handler,
    options: eventApi.findByClub.options as RouteOptions,
  },
  {
    method: "POST",
    path: "/api/events",
    handler: eventApi.create.handler,
    options: eventApi.create.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/events/{id}",
    handler: eventApi.deleteOne.handler,
    options: eventApi.deleteOne.options as RouteOptions,
  },
  {
    method: "DELETE",
    path: "/api/events",
    handler: eventApi.deleteAll.handler,
    options: eventApi.deleteAll.options as RouteOptions,
  },
];