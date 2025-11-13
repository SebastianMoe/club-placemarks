import axios, { type AxiosInstance } from "axios";
import type { NewUser, User } from "../../src/model/interface/user.ts";

export class ClubService {
  clubUrl = "http://localhost:3000";

  axios: AxiosInstance;

  constructor(baseUrl = "http://localhost:3000") {
    this.clubUrl = baseUrl;
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      withCredentials: true,
    });
  }

  async clearAuth() {
    this.axios.defaults.headers.common.Authorization = "";
  }

  async authenticate(user: NewUser) {
    const response = await this.axios.post("/api/users/authenticate", {
      email: user.email,
      password: user.password,
    });
    return response.data;
  }

  async createUser(user: NewUser) {
    const response = await this.axios.post("/api/users", user);
    return response.data;
  }

  async getUser(id: string) {
    const response = await this.axios.get(`/api/users/${id}`);
    return response.data;
  }

  async getAllUsers() {
    const response = await this.axios.get("/api/users");
    return response.data;
  }

  async deleteAllUsers() {
    const response = await this.axios.delete("/api/users");
    return response.data;
  }
}

export const clubService = new ClubService();
