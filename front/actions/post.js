import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "../config/config";
import userSlice from "../reducers/user";

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

// 문의사항 불러오기
export const loadsupports = createAsyncThunk(
  "post/loadsupports",
  async (data) => {
    const response = await axios.get(
      `/post/getsupports?last=${data?.lastId || 0}`
    );
    return response.data;
  }
);

// 문의사항 만들기
export const addsupport = createAsyncThunk(
  "post/addsupport",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/post", data);
      thunkAPI.dispatch(userSlice.actions.addsupport(response.data.id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
