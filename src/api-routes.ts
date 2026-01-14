import type { ServerRoute } from "@hapi/hapi";
import { userApi } from "./api/user-api.js";
import { clubApi } from "./api/club-api.js";

export const apiRoutes: ServerRoute[] = [
  // User API routes
  {
    method: "GET",
    path: "/api/users",
    options: { auth: false, tags: ["api"] },
    handler: userApi.find.handler,
  },
  {
    method: "GET",
    path: "/api/users/{id}",
    options: { auth: false, tags: ["api"] },
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
    path: "/api/users",
    options: { auth: false, tags: ["api"] },
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
    options: { auth: false, tags: ["api"] },
    handler: clubApi.find.handler,
  },
  {
    method: "GET",
    path: "/api/clubs/{id}",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.findOne.handler,
  },
  {
    method: "GET",
    path: "/api/users/{userId}/clubs",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.findByUser.handler,
  },
  {
    method: "POST",
    path: "/api/clubs",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.create.handler,
  },
  {
    method: "PUT",
    path: "/api/clubs/{id}",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.update.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs/{id}",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.deleteOne.handler,
  },
  {
    method: "DELETE",
    path: "/api/clubs",
    options: { auth: false, tags: ["api"] },
    handler: clubApi.deleteAll.handler,
  },
];