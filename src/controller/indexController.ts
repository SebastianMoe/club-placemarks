import type { Request, ResponseToolkit } from "@hapi/hapi";

export const indexController = {
  index: (request: Request, responseToolkit: ResponseToolkit) =>
    responseToolkit.view("index", {
      title: "Club Placemarks",
    }, { layout: false }),
};