import crypto from "crypto";
import { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import morgan from "morgan"
import { ValidationError } from "yup";

export const setupMiddlewares = (app: Application) => {
  app.use(cors())
  app.use(morgan("combined"))
}

export function setupErrorMiddleware(app: Application, logger = console){
  app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: { reason: err.errors } });
    }

    const traceId = crypto.randomUUID();
    const now = new Date().toISOString();

    logger.error(`${now} [${traceId}][InternalServerError]: ${err.name}`)
    logger.error(`${now} [${traceId}][InternalServerError]: ${err.message}`)
    logger.error(`${now} [${traceId}][InternalServerError]: ${err.stack}`)

    return res
      .status(500)
      .json({ error: { reason: ["Internal Server Error"] }, traceId });
  });
};
