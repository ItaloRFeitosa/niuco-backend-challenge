export const INVALID_EMAIL_ERROR = "invalid user email";

export class UserEmail {
  private constructor(private _value: string) {}

  get value() {
    if (this.isDomainAllowed()) return this._value;
    return this.getProtectedEmail();
  }

  private isDomainAllowed() {
    const allowedDomains = ["niuco.com.br"];
    return allowedDomains.some((domain) => this._value.includes(domain));
  }

  private getProtectedEmail() {
    const [alias, domain] = this._value.split("@");
    const newAlias = alias.slice(0, 2) + "****" + alias.slice(-2);
    return `${newAlias}@${domain}`;
  }

  static create(email: string): UserEmail {
    // TODO: check is is valid email
    if (!email) {
      throw new Error(INVALID_EMAIL_ERROR);
    }

    return new UserEmail(email);
  }
}
