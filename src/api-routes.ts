import type { ServerRoute } from "@hapi/hapi";
import { userApi } from "./api/user-api.js";
import { clubApi } from "./api/club-api.js";

export const apiRoutes: ServerRoute[] = [
  // User API routes
  { method: "GET", path: "/api/users", options: { auth: false }, ...userApi.find },
  { method: "GET", path: "/api/users/{id}", options: { auth: false }, ...userApi.findOne },
  { method: "POST", path: "/api/users", options: { auth: false }, ...userApi.create },
  { method: "DELETE", path: "/api/users", options: { auth: false }, ...userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", options: { auth: false }, ...userApi.authenticate },

  // Club API routes
  { method: "GET", path: "/api/clubs", options: { auth: false }, ...clubApi.find },
  { method: "GET", path: "/api/clubs/{id}", options: { auth: false }, ...clubApi.findOne },
  { method: "GET", path: "/api/users/{userId}/clubs", options: { auth: false }, ...clubApi.findByUser },
  { method: "POST", path: "/api/clubs", options: { auth: false }, ...clubApi.create },
  { method: "PUT", path: "/api/clubs/{id}", options: { auth: false }, ...clubApi.update },
  { method: "DELETE", path: "/api/clubs/{id}", options: { auth: false }, ...clubApi.deleteOne },
  { method: "DELETE", path: "/api/clubs", options: { auth: false }, ...clubApi.deleteAll },
];
