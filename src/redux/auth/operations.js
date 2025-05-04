import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/users/signup", credentials);
      setAuthHeader(data.token);
      toast.success("You have successfully registered");
      return data;
    } catch (error) {
      toast.error("Email already in use!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/users/signin", credentials);
      setAuthHeader(data.token);
      toast.success("You have successfully logged in");
      return data;
    } catch (error) {
      toast.error("Email or password is wrong!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/users/signout");

    localStorage.removeItem("token");
    clearAuthHeader();

    toast.success("Sign out success");
    return null;
  } catch (error) {
    localStorage.removeItem("token");
    clearAuthHeader();

    toast.error(`Error: ${error.message || "Server not answer!"}`);
    return thunkAPI.rejectWithValue(error.message || null);
  } finally {
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(token);
      const { data } = await axiosInstance.get("/users/current/full");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(
        "/users/current/edit",
        userData
      );
      toast.success("Successfully updated profile");
      return data;
    } catch (error) {
      toast.error("Error updating profile");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPet = createAsyncThunk(
  "auth/addPet",
  async (petData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/users/current/pets/add",
        petData
      );
      toast.success("Successfully added pet");
      return data;
    } catch (error) {
      toast.error("Error adding pet");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removePet = createAsyncThunk(
  "auth/removePet",
  async (petId, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(
        `/users/current/pets/remove/${petId}`
      );
      toast.success("Successfully removed pet");
      return data;
    } catch (error) {
      toast.error("Error removing pet");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
