import { ISODate } from "@/entities/iso-date";
import { UserProps } from "@/entities/user";
import { UserEmail } from "@/entities/user-email";

export const mockUserProps = (): UserProps => {
  const userEmail = UserEmail.create("testemail@test.com");
  const userLastActivityAt = ISODate.fromUnixEpoch(1656534738);
  return {
    id: "some-id",
    name: "some-name",
    email: userEmail,
    isActive: true,
    isPaying: false,
    lastActivityAt: userLastActivityAt,
  };
};
