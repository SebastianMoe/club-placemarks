import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import HapiSwagger from "hapi-swagger";
import dotenv from "dotenv";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import Handlebars from "handlebars";
import { validate } from "./api/jwt-utils.js";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { accountsController } from "./controller/accountsController.js";
import { dataBase } from "./model/db.js";

const result: any = dotenv.config();
if (result.error) {
  console.log(result.error);
}

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const init = async () => {
  await dataBase.init("mongo");

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    routes: { 
      cors: true 
    },
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(hapiAuthJwt2);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "placemark-session",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD!,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("jwt");

  Handlebars.registerHelper("eq", (a, b) => a === b);

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

  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init().catch((error: Error) => {
  console.error(error.message);
});