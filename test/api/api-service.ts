import axios, { type AxiosInstance } from "axios";
import dotenv from "dotenv";
import type { NewUser, User } from "../../src/model/interface/user.ts";
import type { NewClub, Club } from "../../src/model/interface/club.ts";
import type { NewMemberStats } from "../../src/model/interface/member-stats.js";

dotenv.config();

export class ClubService {
  clubUrl = "";

  axios: AxiosInstance;

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.clubUrl = baseUrl;
    } else {
      const port = process.env.PORT || "3000";
      const host = process.env.HOST || "localhost";
      this.clubUrl = `http://${host}:${port}`;
    }
    this.axios = axios.create({
      baseURL: this.clubUrl,
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
    this.axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
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

  // Club API methods
  async createClub(club: NewClub, userId: string) {
    const response = await this.axios.post("/api/clubs", { ...club, userId });
    return response.data;
  }

  async getClub(id: string) {
    const response = await this.axios.get(`/api/clubs/${id}`);
    return response.data;
  }

  async getAllClubs() {
    const response = await this.axios.get("/api/clubs");
    return response.data;
  }

  async getClubsByUser(userId: string) {
    const response = await this.axios.get(`/api/users/${userId}/clubs`);
    return response.data;
  }

  async updateClub(club: Club) {
    const response = await this.axios.put(`/api/clubs/${club._id}`, club);
    return response.data;
  }

  async deleteClub(id: string) {
    const response = await this.axios.delete(`/api/clubs/${id}`);
    return response.data;
  }

  async deleteAllClubs() {
    const response = await this.axios.delete("/api/clubs");
    return response.data;
  }

  // Member Stats API methods
  async createMemberStats(clubId: string, stats: NewMemberStats) {
    const response = await this.axios.post(`/api/clubs/${clubId}/stats`, stats);
    return response.data;
  }

  async getMemberStats(clubId: string) {
    const response = await this.axios.get(`/api/clubs/${clubId}/stats`);
    return response.data;
  }

  async deleteAllStats() {
    const response = await this.axios.delete("/api/member-stats");
    return response.data;
  }
}

export const clubService = new ClubService();