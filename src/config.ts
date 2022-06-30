export const config = {
  SAAS_MOCK_URL: process.env.SAAS_MOCK_URL || "http://localhost:8080",
  PORT: process.env.PORT || 3333,
  STAGE: process.env.NODE_ENV || "development"
}
