import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase } from "../model/db.js";

export const adminController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const users = await dataBase.userStore.getAll();
      return h.view("admin", { title: "Admin Dashboard", users: users, loggedIn: true, isAdmin: true });
    },
  },

  deleteUser: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = await dataBase.userStore.getById(request.params.id);
      if (user) {
        await dataBase.userStore.deleteById(user._id);
      }
      return h.redirect("/admin");
    },
  },
};
