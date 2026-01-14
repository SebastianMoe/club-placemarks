import Boom from "@hapi/boom";
import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import type { NewUser, User } from "../model/interface/user.js";
import { IdSpec, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus } from "./joi-schemas.js";

interface UserCredentials {
  email: string;
  password: string;
}

export const userApi = {
  find: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore.getAll();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users",
    response: { schema: UserArray, failAction: "ignore" },
  },

  findOne: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore.getById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Find a User",
    notes: "Returns a user",
    validate: { params: { id: IdSpec }, failAction: "ignore" },
    response: { schema: UserSpecPlus, failAction: "ignore" },
  },

  create: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const payload = request.payload as NewUser;
        const user = await db.userStore.create(payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: "ignore" },
    response: { schema: UserSpecPlus, failAction: "ignore" },
  },

  deleteAll: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
  },

  authenticate: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const credentials = request.payload as UserCredentials;
        const user = await db.userStore.getByEmail(credentials.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== credentials.password) {
          return Boom.unauthorized("Invalid password");
        }
        
        return h.response({ success: true, userId: user._id }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a User",
    notes: "If user has valid credentials",
    validate: { payload: UserCredentialsSpec, failAction: "ignore" },
  },
};
