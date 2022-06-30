import { User } from "@/entities/user";
import { UserGateway } from "@/services/ports";
import { UserService } from "@/services/user-service";
import { mockUserProps } from "@tests/mocks/user";
import { Mock } from "@tests/types";

describe("UserService", () => {
  describe("getUsers", () => {
    it("should return array of user data", async () => {
      const mockUser = User.create(mockUserProps());
      const gateway: Mock<UserGateway> = {
        fetchUsers: jest.fn().mockResolvedValueOnce([mockUser]),
      };

      const service = new UserService(gateway);

      const result = await service.getUsers({ page: 1, limit: 5 });

      expect(result).toEqual([mockUser.toObject()]);
      expect(gateway.fetchUsers).toBeCalledTimes(1);
    });
  });
});
