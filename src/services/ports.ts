import { User, UserReadData } from "@/entities/user";

export interface GetUsersService {
  getUsers(query: GetUsersQuery): Promise<UserReadData[]>;
}

export interface UserGateway {
  fetchUsers(query: GetUsersQuery): Promise<User[]>;
}

export type GetUsersQuery = {
  paying?: boolean;
  active?: boolean;
  name?: string;
  page: number;
  limit: number;
};
