import { User, UserReadData } from "@/entities/user";
import { mockUserProps } from "@tests/mocks/user";

describe("User", () => {
  describe("when passing valid props", () => {
    it("should create a valid user", () => {
      const props = mockUserProps()

      const expectedReadData: UserReadData = {
        ...props,
        email: props.email.value,
        lastActivityAt: props.lastActivityAt.value,
      }

      const user = User.create(props);

      expect(user.toObject()).toEqual(expectedReadData);
    });
  });
});
