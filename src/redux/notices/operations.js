import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getNotices = createAsyncThunk(
  "notices/getNotices",
  async (params, thunkAPI) => {
    try {
      const {
        keyword = "", 
        category = "",
        sex = "",
        species = "",
        locationId = "",
        radioSearch = "",
        page = 1,
        limit = 6,
      } = params || {};

      const queryParams = {
        keyword,
        category,
        species,
        locationId,
        page: sex ? undefined : page,
        limit: sex ? 2000 : limit,
      };

      if (radioSearch === "Cheap") {
        queryParams.byPrice = true;
      } else if (radioSearch === "Expensive") {
        queryParams.byPrice = false;
      }

      if (radioSearch === "Popular") {
        queryParams.byPopularity = false;
      } else if (radioSearch === "Unpopular") {
        queryParams.byPopularity = true;
      }

      const { data } = await axiosInstance.get("/notices", {
        params: queryParams,
      });

      if (!sex) {
        return data;
      }

      let filteredResults = data.results.filter((item) => item.sex === sex);
      const totalPages = Math.ceil(filteredResults.length / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const allNotices = filteredResults.slice(startIndex, endIndex);

      return { results: allNotices, totalPages };
    } catch (error) {
      console.error("Notices error:", error.response?.data || error.message);
      toast.error("Failed to load notices");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getOneNotice = createAsyncThunk(
  "notices/getOneNotice",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/notices/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to load notice details");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getCategories = createAsyncThunk(
  "notices/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/notices/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getGenders = createAsyncThunk(
  "notices/getGenders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/notices/sex");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getTypes = createAsyncThunk(
  "notices/getTypes",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/notices/species");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getLocations = createAsyncThunk(
  "notices/getLocations",
  async (query = "", thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/cities", {
        params: { query }, 
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchLocations = createAsyncThunk(
  "notices/searchLocations",
  async (searchQuery, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/cities", {
        params: { keyword: searchQuery },
      });
      return data;
    } catch (error) {
      console.error(
        "Location search error:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue([]);
    }
  }
);


export const addNotice = createAsyncThunk(
  "notices/addNotice",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/notices/favorites/add/${id}`);
      toast.success("Added to favorites");
      return data;
    } catch (error) {
      toast.error("Failed to add to favorites");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteNotice = createAsyncThunk(
  "notices/deleteNotice",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(
        `/notices/favorites/remove/${id}`
      );
      toast.success("Removed from favorites");
      return data;
    } catch (error) {
      toast.error("Failed to remove from favorites");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
