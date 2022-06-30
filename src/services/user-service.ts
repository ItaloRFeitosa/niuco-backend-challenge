import { UserReadData } from "@/entities/user";
import { GetUsersService, GetUsersQuery, UserGateway } from "./ports";

export class UserService implements GetUsersService{
  constructor(private userGateway: UserGateway){}

  public async getUsers(query: GetUsersQuery): Promise<UserReadData[]> {
    const users = await this.userGateway.fetchUsers(query)
    return users.map(user => user.toObject())
  }
}
