import { config } from "@/config";
import axios from "axios";
import {
  SaasMockUserData,
} from "./types";

const axiosInstance = axios.create({ baseURL: config.SAAS_MOCK_URL });

export const fetchUsers = async (query: URLSearchParams) => {
  console.debug("fetching to SaaS Mock API with query:", query.toString())
  const resp = await axiosInstance.get<SaasMockUserData[]>(`/users?${query.toString()}`);
  return resp.data;
};


