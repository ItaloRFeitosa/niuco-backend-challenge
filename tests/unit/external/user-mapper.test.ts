import { UserReadData } from "@/entities/user";
import { SaasMockUserData } from "@/external/saas-mock/types";
import { toUser } from "@/external/saas-mock/user-mapper";

type TestCase = {
  case: string;
  input: SaasMockUserData;
  expected: UserReadData;
};

const activeAndPayingUser: TestCase[] = [
  {
    case: "should be active and paying user",
    input: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@testemail.com.br",
      status: "enabled",
      role: "admin",
      last_activity: 1649179152,
    },
    expected: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "jo****or@testemail.com.br",
      isActive: true,
      isPaying: true,
      lastActivityAt: "2022-04-05T17:19:12.000Z",
    },
  },
  {
    case: "should be active and paying user",
    input: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@niuco.com.br",
      status: "enabled",
      role: "editor",
      last_activity: 1649179152,
    },
    expected: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@niuco.com.br",
      isActive: true,
      isPaying: true,
      lastActivityAt: "2022-04-05T17:19:12.000Z",
    },
  },
];

const activeAndNonPayingUser: TestCase[] = [
  {
    case: "should be active and paying user",
    input: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@niuco.com.br",
      status: "enabled",
      role: "viewer",
      last_activity: 1649179152,
    },
    expected: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@niuco.com.br",
      isActive: true,
      isPaying: false,
      lastActivityAt: "2022-04-05T17:19:12.000Z",
    },
  },
  {
    case: "should be active and paying user",
    input: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "john.connor@testemail.com.br",
      status: "enabled",
      role: "system",
      last_activity: 1649179152,
    },
    expected: {
      id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
      name: "John Connor",
      email: "jo****or@testemail.com.br",
      isActive: true,
      isPaying: false,
      lastActivityAt: "2022-04-05T17:19:12.000Z",
    },
  },
];

const inactiveUserTestCase: TestCase = {
  case: "should be inactive and not paying user",
  input: {
    id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
    name: "John Connor",
    email: "john.connor@niuco.com.br",
    status: "disabled",
    role: "admin",
    last_activity: 1649179152,
  },
  expected: {
    id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
    name: "John Connor",
    email: "john.connor@niuco.com.br",
    isActive: false,
    isPaying: false,
    lastActivityAt: "2022-04-05T17:19:12.000Z",
  },
};

const protectedUserEmailTestCase: TestCase = {
  case: "should be inactive and not paying user",
  input: {
    id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
    name: "John Connor",
    email: "john.connor@testemail.com.br",
    status: "disabled",
    role: "admin",
    last_activity: 1649179152,
  },
  expected: {
    id: "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
    name: "John Connor",
    email: "jo****or@testemail.com.br",
    isActive: false,
    isPaying: false,
    lastActivityAt: "2022-04-05T17:19:12.000Z",
  },
};

const testCases: TestCase[] = [
  protectedUserEmailTestCase,
  inactiveUserTestCase,
  ...activeAndPayingUser,
  ...activeAndNonPayingUser
];

describe("UserMapper", () => {
  describe("toUser", () => {
    describe("when called with SaasMock user data", () => {
      it.each(testCases)("$case", (testCase) => {
        const user = toUser(testCase.input);
        expect(user.toObject()).toEqual(testCase.expected);
      });
    });
  });
});
