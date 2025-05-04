import { createSlice } from "@reduxjs/toolkit";
import {
  getNotices,
  getOneNotice,
  getCategories,
  getGenders,
  getTypes,
  getLocations,
  addNotice,
  deleteNotice,
  searchLocations,
} from "./operations";

const initialState = {
  notices: {
    results: [],
    totalPages: 1,
  },
  currentNotice: null,
  categories: [],
  genders: [],
  species: [],
  locations: [],
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    clearNoticesError: (state) => {
      state.error = null;
    },
    resetNoticesFilters: (state) => {
      state.notices = {
        results: [],
        totalPages: 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotices.fulfilled, (state, action) => {
        state.notices = action.payload;
        state.isLoading = false;
      })
      .addCase(getNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getOneNotice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOneNotice.fulfilled, (state, action) => {
        state.currentNotice = action.payload;
        state.isLoading = false;
      })
      .addCase(getOneNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getGenders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
        state.isLoading = false;
      })
      .addCase(getGenders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.species = action.payload;
        state.isLoading = false;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getLocations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.isLoading = false;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addNotice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNotice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(searchLocations.pending, (state) => {
        state.error = null;
      })
      .addCase(searchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(searchLocations.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteNotice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNoticesError, resetNoticesFilters } = noticesSlice.actions;
export default noticesSlice.reducer;
