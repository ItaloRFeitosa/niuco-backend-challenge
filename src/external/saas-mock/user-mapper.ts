import { ISODate } from "@/entities/iso-date";
import { User } from "@/entities/user";
import { UserEmail } from "@/entities/user-email";
import { GetUsersQuery } from "@/services/ports";
import {
  SaasMockUserData,
  SaasMockUserRole,
  SaasMockUserStatus,
} from "./types";

const isActive = (saasUser: SaasMockUserData) => {
  return saasUser.status !== SaasMockUserStatus.DISABLED;
};

const isPaying = (saasUser: SaasMockUserData) => {
  if (!isActive(saasUser)) {
    return false;
  }

  const roles: Record<string, boolean> = {
    [SaasMockUserRole.VIEWER]: false,
    [SaasMockUserRole.SYSTEM]: false,
    [SaasMockUserRole.EDITOR]: true,
    [SaasMockUserRole.ADMIN]: true,
  };

  return roles[saasUser.role];
};

export const toUser = (saasUser: SaasMockUserData) => {
  return User.create({
    id: saasUser.id,
    name: saasUser.name,
    email: UserEmail.create(saasUser.email),
    lastActivityAt: ISODate.fromUnixEpoch(saasUser.last_activity),
    isActive: isActive(saasUser),
    isPaying: isPaying(saasUser),
  });
};

export const toSaasQuery = (query: GetUsersQuery) => {
  const saasQuery = new URLSearchParams({
    _page: String(query.page),
    _limit: String(query.limit),
  });
  if (query.active === true) {
    saasQuery.set("status", SaasMockUserStatus.ENABLED);
  }
  if (query.active === false) {
    saasQuery.set("status", SaasMockUserStatus.DISABLED);
  }
  if (query.paying === true) {
    saasQuery.append("role_ne", SaasMockUserRole.SYSTEM);
    saasQuery.append("role_ne", SaasMockUserRole.VIEWER);
    saasQuery.set("status", SaasMockUserStatus.ENABLED);
  }
  if (query.paying === false) {
    saasQuery.append("role_ne", SaasMockUserRole.ADMIN);
    saasQuery.append("role_ne", SaasMockUserRole.EDITOR);
  }
  if (query.name) {
    saasQuery.set("name_like", query.name);
  }

  return saasQuery;
};
