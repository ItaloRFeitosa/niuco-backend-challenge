import express from "express";
import { setupErrorMiddleware, setupMiddlewares } from "./middlewares";
import { setupRoutes } from "./routes";

const app = express();
setupMiddlewares(app)
setupRoutes(app);
setupErrorMiddleware(app);

export default app;
