import type { ServerRoute } from "@hapi/hapi";
import { indexController } from "./controller/indexController.js";

export const webRoutes: ServerRoute[] = [
  { method: "GET", path: "/", handler: indexController.index },

  // static ressources route for @hapi/inert plugin
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } } },
];