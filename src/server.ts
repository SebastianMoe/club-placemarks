import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import HapiSwagger from "hapi-swagger";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import Handlebars from "handlebars";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { accountsController } from "./controller/accountsController.js";
import { dataBase } from "./model/db.js";

// check if .env file is present
const result: any = dotenv.config();
if (result.error) {
  console.log(result.error);
}

// get folder path
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// init server
const init = async () => {
  // initialize database
  await dataBase.init("mongo");

  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });

  // register plugins
  const swaggerOptions = {
    info: {
      title: "Playtime API",
      version: "0.1",
    },
  };

  await server.register([
    Inert,
    Vision,
    Cookie,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  // configure cookie authentication
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "placemark-session",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  Handlebars.registerHelper("eq", (a, b) => {
    return a === b;
  });

  // register template engine
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./view",
    layoutPath: "./view/layout",
    partialsPath: "./view/partial",
    layout: true,
    isCached: false,
  });

  // register server routes
  server.route(webRoutes);
  server.route(apiRoutes);

  // start server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

// catch exceptions
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// try to init the server
init().catch((error: Error) => {
  console.error(error.message);
});