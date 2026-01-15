import axios, { type AxiosInstance } from "axios";
import type { NewUser, User } from "../../src/model/interface/user.ts";
import type { NewClub, Club } from "../../src/model/interface/club.ts";
import type { NewMemberStats } from "../../src/model/interface/member-stats.js";

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
    const response = await this.axios.delete("/api/stats");
    return response.data;
  }
}

export const clubService = new ClubService();