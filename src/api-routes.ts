import type { ServerRoute } from "@hapi/hapi";
import { userApi } from "./api/user-api.js";

export const apiRoutes: ServerRoute[] = [
  { method: "GET", path: "/api/users", options: { auth: false }, ...userApi.find },
  { method: "GET", path: "/api/users/{id}", options: { auth: false }, ...userApi.findOne },
  { method: "POST", path: "/api/users", options: { auth: false }, ...userApi.create },
  { method: "DELETE", path: "/api/users", options: { auth: false }, ...userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", options: { auth: false }, ...userApi.authenticate },
];
