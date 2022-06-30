import { User } from "@/entities/user";
import { GetUsersQuery, UserGateway } from "@/services/ports";
import { fetchUsers } from "./client";
import { toSaasQuery, toUser } from "./user-mapper";

export class SassMockUserGateway implements UserGateway{
  public async fetchUsers(query: GetUsersQuery): Promise<User[]> {
    const saasQuery = toSaasQuery(query)
    const saasUsers = await fetchUsers(saasQuery)
    return saasUsers.map(toUser)
  }
}
