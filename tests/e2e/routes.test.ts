import app from "@/external/http/app";
import request from "supertest";

const matchGetUsersContract = (res: request.Response) => {
  expect(res.statusCode).toBe(200);
  expect(res.body.data).toBeDefined();
  expect(res.body.data).toBeInstanceOf(Array);
  res.body.data.forEach((userData: any) => {
    expect(userData).toHaveProperty("id");
    expect(userData).toHaveProperty("name");
    expect(userData).toHaveProperty("email");
    expect(userData).toHaveProperty("isPaying");
    expect(userData).toHaveProperty("isActive");
  });
};

const testCases = [
  {
    when: "paying=true",
    should: "return array of paying users",
    expect: (users: Record<string, any>[]) => {
      return users.every((userData) => userData.isPaying);
    },
  },
  {
    when: "paying=false",
    should: "return array of non paying users",
    expect: (users: Record<string, any>[]) => {
      return users.every((userData) => !userData.isPaying);
    },
  },
  {
    when: "paying=false&active=true",
    should: "return array of active and non paying users",
    expect: (users: Record<string, any>[]) => {
      return users.every((userData) => !userData.isPaying && userData.isActive);
    },
  },
  {
    when: "active=false",
    should: "return array of non active users",
    expect: (users: Record<string, any>[]) => {
      return users.every((userData) => !userData.isActive);
    },
  },
  {
    when: "limit=5",
    should: "return array of users with size = 5",
    expect: (users: Record<string, any>[]) => {
      return users.length === 5;
    },
  },
  {
    when: "name=connor",
    should: "return array of users where name includes connor",
    expect: (users: Record<string, any>[]) => {
      return users.some((user) => user.name.toLowerCase().includes("connor"));
    },
  },
];

describe("Endpoints", () => {
  describe("GET /users", () => {
    describe("when passing query params", () => {
      it.each(testCases)("when $when $should", async (testCase) => {
        const res = await request(app).get(`/users?${testCase.when}`).send();
        matchGetUsersContract(res);
        expect(testCase.expect(res.body.data)).toBeTruthy();
      });
    });
    describe("when passing invalid query params", () => {
      it("should return validation error with code 400 ", async () => {
        const res = await request(app).get(`/users?paying=invalid`).send();
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error.reason).toBeInstanceOf(Array)
      });
    });
    describe("when not passing query params", () => {
      it("should return code 200 with array of users", async () => {
        const res = await request(app).get("/users").send();
        matchGetUsersContract(res);
      });
    });
  });
  describe("GET /health", () => {
    it("should return code 200 with ok = true", async () => {
      const res = await request(app).get("/health").send();
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({ ok: true });
    });
  });
  describe("GET /test_error_middleware", () => {
    it("should return code 500 with error", async () => {
      const res = await request(app).get("/test_error_middleware").send();
      expect(res.statusCode).toBe(500);
      expect(res.body).toMatchObject({
        error: { reason: ["Internal Server Error"] },
      });
    });
  });
});
