import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/friends");
      return data;
    } catch (error) {
      toast.error("Failed to load partners");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
