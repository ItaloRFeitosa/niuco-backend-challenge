import { Handler } from "express";
import { GetUsersQuery } from "@/services/ports";
import { UserService } from "@/services/user-service";
import { GetUsersQuerySchema } from "@/schemas/user-schemas";
import { SassMockUserGateway } from "@/external/saas-mock/user-gateway";

const userService = new UserService(new SassMockUserGateway());

export const getUsers: Handler = async (req, res, next) => {
  try {
    const query = await GetUsersQuerySchema.validate(req.query);
    const users = await userService.getUsers(query as GetUsersQuery);
    return res.json({ data: users });
  } catch (error) {
    return next(error);
  }
};

export const health: Handler = (_, res) =>
  res.json({ ok: true, timestamp: new Date() });
