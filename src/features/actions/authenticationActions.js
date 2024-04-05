import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// ------------------------------------Async Actions----------------------------------



//Login Api
export const logIn = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    console.log("inner api:::", payload);
    try {
      const { data } = await instance.post("auth/login", payload, {
        withCredentials: true,
      });
      console.log("Login Api Called::::", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);

// logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/logout", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(e?.response?.data?.message);
    }
  }
);
