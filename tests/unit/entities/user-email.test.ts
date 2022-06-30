import { INVALID_EMAIL_ERROR, UserEmail } from "@/entities/user-email";

describe("UserEmail", () => {
  describe("when passing a valid email value", () => {
    it("should create a valid UserEmail with protected email", () => {
      const email = "testemail@test.com";
      const expectedUserEmailValue = "te****il@test.com";
      const gotUserEmail = UserEmail.create(email);
      expect(gotUserEmail.value).toMatch(expectedUserEmailValue);
    });
    describe("and email has 'niuco.com.br'", () => {
      it("should create a valid UserEmail", () => {
        const email = "testemail@niuco.com.br";
        const gotUserEmail = UserEmail.create(email);
        expect(gotUserEmail.value).toMatch(email);
      });
    });
  });
  describe("when passing a invalid email value", () => {
    it("should throw error", () => {
      const invalidEmail = "";
      expect(() => UserEmail.create(invalidEmail)).toThrow(INVALID_EMAIL_ERROR);
    });
  });
});
