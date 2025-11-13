import type { ServerRoute } from "@hapi/hapi";
import { indexController } from "./controller/indexController.js";
import { accountsController } from "./controller/accountsController.js";

export const webRoutes: ServerRoute[] = [
  { method: "GET", path: "/", options: { auth: false }, ...accountsController.index },
  { method: "GET", path: "/signup", options: { auth: false }, ...accountsController.showSignup },
  { method: "POST", path: "/register", options: { auth: false }, ...accountsController.signup },
  { method: "GET", path: "/login", options: { auth: false }, ...accountsController.showLogin },
  { method: "POST", path: "/authenticate", options: { auth: false }, ...accountsController.login },
  { method: "GET", path: "/logout", ...accountsController.logout },
  { method: "GET", path: "/dashboard", ...accountsController.showDashboard },

  // static ressources route for @hapi/inert plugin
  { method: "GET", path: "/{param*}", options: { auth: false }, handler: { directory: { path: "./public" } } },
];