export enum SaasMockUserStatus {
  ENABLED = "enabled",
  DISABLED = "disabled"
}

export enum SaasMockUserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
  SYSTEM = "system"
}

export type SaasMockUserData = {
  id: string,
  name: string,
  email: string,
  status: `${SaasMockUserStatus}`,
  role: `${SaasMockUserRole}`,
  last_activity: number
}
