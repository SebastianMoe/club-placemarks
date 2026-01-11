import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase as db } from "../model/db.js";
import type { NewClub } from "../model/interface/club.js";
import type { User } from "../model/interface/user.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as unknown as User;
      const clubs = await db.clubStore.getByUserId(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        clubs: clubs,
        loggedIn: true,
        isAdmin: loggedInUser.scope.includes("admin"),
      };
      return h.view("dashboard", viewData);
    },
  },

  addClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials as unknown as User;
      const payload = request.payload as NewClub;
      
      const newClub: NewClub = {
        name: payload.name,
        description: payload.description || null,
        latitude: payload.latitude,
        longitude: payload.longitude,
        category: payload.category || "other",
        imageUrl: payload.imageUrl || undefined,
      };
      
      await db.clubStore.create(newClub, loggedInUser._id);
      return h.redirect("/dashboard");
    },
  },

  deleteClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const club = await db.clubStore.getById(request.params.id);
      const loggedInUser = request.auth.credentials as unknown as User;
      
      // Nur löschen, wenn der User der Besitzer ist
      if (club && club.userId === loggedInUser._id) {
        await db.clubStore.deleteById(club._id);
      }
      
      return h.redirect("/dashboard");
    },
  },
};
