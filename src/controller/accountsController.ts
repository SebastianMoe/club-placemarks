import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase } from "../model/db.js";
import type { NewUser, User } from "../model/interface/user.js";

interface RequestWithCookieAuth extends Request {
  cookieAuth: {
    set: (session: { id: string }) => void;
    clear: () => void;
  };
}

export const accountsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },

  showSignup: {
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("signup", { title: "Sign up for Placemark" });
    },
  },

  signup: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const payload = request.payload as NewUser;
      const newUser: NewUser = {
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };

      await dataBase.userStore.create(newUser);
      return h.redirect("/");
    },
  },

  showLogin: {
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("login", { title: "Login to Placemark" });
    },
  },

  login: {
    handler: async function (request: RequestWithCookieAuth, h: ResponseToolkit) {
      const { email, password } = request.payload as { email: string; password: string };
      const user = await dataBase.userStore.getByEmail(email);

      if (!user || user.password !== password) {
        return h.redirect("/");
      }

      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: async function (request: RequestWithCookieAuth, h: ResponseToolkit) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showDashboard: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials;
      return h.view("dashboard", { title: "Dashboard", user, loggedIn: true });
    },
  },

  async validate(request: Request, session: { id: string }) {
    const user = await dataBase.userStore.getById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
