import type { Request, ResponseToolkit } from "@hapi/hapi";
import { dataBase } from "../model/db.js";
import type { NewClub, Club } from "../model/interface/club.js";
import type { User } from "../model/interface/user.js";

export const clubsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials as unknown as User;
      const clubs = await dataBase.clubStore.getByUserId(user._id);
      return h.view("dashboard", { 
        title: "Dashboard", 
        user, 
        clubs,
        loggedIn: true 
      });
    },
  },

  showAddClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials as unknown as User;
      return h.view("add-club", { 
        title: "Add Club", 
        user,
        loggedIn: true 
      });
    },
  },

  showClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials as unknown as User;
      const clubId = request.params.id;
      const club = await dataBase.clubStore.getById(clubId);
      
      if (!club) {
        return h.redirect("/dashboard");
      }

      return h.view("club-view", { 
        title: "Club Details", 
        user,
        club,
        loggedIn: true 
      });
    },
  },

  showEditClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials as unknown as User;
      const clubId = request.params.id;
      const club = await dataBase.clubStore.getById(clubId);
      
      if (!club || club.userId !== user._id) {
        return h.redirect("/dashboard");
      }

      return h.view("edit-club", { 
        title: "Edit Club", 
        user,
        club,
        loggedIn: true 
      });
    },
  },

  updateClub: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.auth.credentials as unknown as User;
      const clubId = request.params.id;
      const payload = request.payload as NewClub;
      
      const existingClub = await dataBase.clubStore.getById(clubId);
      if (!existingClub || existingClub.userId !== user._id) {
        return h.redirect("/dashboard");
      }

      const updatedClub: Club = {
        _id: clubId,
        name: payload.name,
        description: payload.description || null,
        latitude: payload.latitude,
        longitude: payload.longitude,
        imageUrls: payload.imageUrls || null,
        userId: user._id,
      };

      await dataBase.clubStore.update(updatedClub);
      return h.redirect("/dashboard");
    },
  },
};
