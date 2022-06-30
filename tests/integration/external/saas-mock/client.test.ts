import { fetchUsers } from "@/external/saas-mock/client"

describe("Saas Mock Client", () => {
  it("should return an array of users with expected contract", async () => {
    const query = new URLSearchParams({_page: "1", _limit: "5"})
    const users = await fetchUsers(new URLSearchParams(query))

    expect(users).toBeInstanceOf(Array)
    users.forEach((user) => {
      expect(user).toHaveProperty("id")
      expect(user).toHaveProperty("name")
      expect(user).toHaveProperty("email")
      expect(user).toHaveProperty("status")
      expect(user).toHaveProperty("role")
      expect(user).toHaveProperty("last_activity")
    })
  })
})
