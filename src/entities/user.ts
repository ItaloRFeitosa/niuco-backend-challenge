import { ISODate } from "./iso-date";
import { UserEmail } from "./user-email";

export type UserProps = {
  id: string;
  name: string;
  email: UserEmail;
  lastActivityAt: ISODate;
  isPaying: boolean;
  isActive: boolean;
};

export type UserReadData = Readonly<
  Omit<UserProps, "email" | "lastActivityAt"> & {
    email: string;
    lastActivityAt: string;
  }
>;

export class User {
  private constructor(private props: UserProps) {}

  public toObject(): UserReadData {
    return Object.freeze({
      ...this.props,
      email: this.props.email.value,
      lastActivityAt: this.props.lastActivityAt.value,
    });
  }

  static create(props: UserProps): User {
    return new User(props);
  }
}
