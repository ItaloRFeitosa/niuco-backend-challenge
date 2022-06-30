export const INVALID_UNIX_EPOCH_VALUE_ERROR = "invalid unix epoch value";

export class ISODate {
  private constructor(private _value: Date) {}

  get value() {
    return this._value.toISOString();
  }

  static fromUnixEpoch(value: number): ISODate {
    if (value < 0) throw new Error(INVALID_UNIX_EPOCH_VALUE_ERROR);
    const dateInNanoseconds = value * 1000;
    return new ISODate(new Date(dateInNanoseconds));
  }
}
