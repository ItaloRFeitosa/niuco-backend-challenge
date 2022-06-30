import { config } from "@/config";
import { Application } from "express";
import { getUsers, health } from "./controllers";

export const setupRoutes = (app: Application) => {
  app.get("/health", health);
  app.get("/users", getUsers);

  if(config.STAGE === "test"){
    app.get("/test_error_middleware", (req, res, next) => next(new Error("fake error")))
  }
};
