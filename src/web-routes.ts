import type { ServerRoute } from "@hapi/hapi";
import { indexController } from "./controller/indexController.js";
import { accountsController } from "./controller/accountsController.js";
import { clubsController } from "./controller/clubsController.js";
import { dashboardController } from "./controller/dashboardController.js";

export const webRoutes: ServerRoute[] = [
  // Authentication routes
  { method: "GET", path: "/", options: { auth: false }, ...accountsController.index },
  { method: "GET", path: "/signup", options: { auth: false }, ...accountsController.showSignup },
  { method: "POST", path: "/register", options: { auth: false }, ...accountsController.signup },
  { method: "GET", path: "/login", options: { auth: false }, ...accountsController.showLogin },
  { method: "POST", path: "/authenticate", options: { auth: false }, ...accountsController.login },
  { method: "GET", path: "/logout", ...accountsController.logout },

  // Dashboard routes
  { method: "GET", path: "/dashboard", ...dashboardController.index },
  { method: "POST", path: "/dashboard/addclub", ...dashboardController.addClub },
  { method: "GET", path: "/dashboard/deleteclub/{id}", ...dashboardController.deleteClub },

  // Club routes
  { method: "GET", path: "/club/{id}", ...clubsController.showClub },
  { method: "GET", path: "/club/{id}/edit", ...clubsController.showEditClub },
  { method: "POST", path: "/club/{id}/edit", ...clubsController.updateClub },

  // static ressources route for @hapi/inert plugin
  { method: "GET", path: "/{param*}", options: { auth: false }, handler: { directory: { path: "./public" } } },
];