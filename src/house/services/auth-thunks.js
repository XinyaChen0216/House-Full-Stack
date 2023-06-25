import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials) => {
    const user = await authService.login(credentials);
    return user;
  }
);

export const findAllUserThunk = createAsyncThunk("auth/users", async () => {
  return await authService.findAllUser();
});

export const profileThunk = createAsyncThunk("auth/profile", async () => {
  return await authService.profile();
});

export const viewProfileThunk = createAsyncThunk("auth/profile", async (username) => {
  return await authService.viewOtherProfile(username);
});

export const viewTopAgentThunk = createAsyncThunk("auth/topagents", async () => {
  return await authService.viewTopAgents();
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (user) => {
    await authService.updateUser(user);
    return user;
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials) => {
    const user = await authService.register(credentials);
    return user;
  }
);
