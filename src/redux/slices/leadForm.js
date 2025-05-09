import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const addLeadAsync = createAsyncThunk(
  "leads/addLeadAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leads/addlead",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bulkUploadAsync = createAsyncThunk(
  "leads/bulkUploadAsync",
  async (formData, { rejectWithValue }) => {

    console.log(formData,'data here')
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leads/upload",
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.msg);
    }
  }
);

export const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },

  reducers: {
    // put all the reducers here
  },

  extraReducers: (builder) => {
    builder
      .addCase(addLeadAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLeadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.push(action.payload);
      })
      .addCase(addLeadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bulkUploadAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUploadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(bulkUploadAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
