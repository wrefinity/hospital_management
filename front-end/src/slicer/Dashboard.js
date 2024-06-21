import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler, { thunkError, getToken } from "./requestHandler";


const initialState = {
  dashboard: [],
  status: "idle",
  message: "",
};

export const getDashboardData = createAsyncThunk(
  "dashboard/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("dashboard", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // get section 
    builder.addCase(getDashboardData.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getDashboardData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.dashboard = payload?.data;
    });
    builder.addCase(getDashboardData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
      state.status = "idle";
    });

  }
});

const { reducer, actions } = dashboardSlice;
export const selectAllDashboardData = (state) => state?.dashboard?.dashboard;
export const getDashboardStatus = (state) => state?.dashboard?.status;
export const { reseter } = actions;
export default reducer;