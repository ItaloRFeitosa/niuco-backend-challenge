import { INVALID_UNIX_EPOCH_VALUE_ERROR, ISODate } from "@/entities/iso-date"

describe("ISODate", () => {
  describe("when passing a valid Unix Epoch value", () => {
    it("should create a valid ISODate", () => {
      const unixEpochValue = 1656534738
      const expectedValue = "2022-06-29T20:32:18"
      const date = ISODate.fromUnixEpoch(unixEpochValue)
      expect(date.value).toMatch(expectedValue)
    })
  })
  describe("when passing an invalid unix epoch value", () => {
    it("should throw error", () => {
      const invalidValue = -1;
      expect(() => ISODate.fromUnixEpoch(invalidValue)).toThrow(INVALID_UNIX_EPOCH_VALUE_ERROR);
    })
  })
})
