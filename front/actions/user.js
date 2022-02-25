import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

export const loadMyInfo = createAsyncThunk("user/loadMyInfo", async () => {
  const response = await axios.get("/user");
  return response.data;
});

//로그인
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//로그아웃
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post("/user/logout");
  return response.data;
});

//회원가입
export const signup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
