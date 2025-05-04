import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getNews = createAsyncThunk(
  "news/getNews",
  async ({ keyword = "", page = 1, limit = 6 }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/news", {
        params: { keyword, page, limit },
      });

      return {
        results: data.results,
        totalPages: data.totalPages,
      };
    } catch (error) {
      toast.error("Failed to load news");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
