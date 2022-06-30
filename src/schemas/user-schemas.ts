import { GetUsersQuery } from "@/services/ports";
import { boolean, number, object, SchemaOf, string } from "yup";

export const GetUsersQuerySchema: SchemaOf<GetUsersQuery> = object({
  paying: boolean(),
  active: boolean(),
  name: string(),
  page: number().required().default(1).min(1),
  limit: number().required().default(50).min(1),
});
