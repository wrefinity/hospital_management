import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";


const initialState = {
  deaths: [],
  status: "idle",
  message: "",
};

export const createDeath = createAsyncThunk(
  "deaths/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        `deaths/${credentials?.patientId}`,
        {...credentials, patient:credentials?.patientId},
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getDeaths = createAsyncThunk(
  "deaths/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("deaths", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const updateDeath = createAsyncThunk(
  "deaths/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `deaths/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


export const deleteDeath = createAsyncThunk(
  "deaths/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDeleteHeader(
        `deaths/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const deathSlice = createSlice({
  name: "deaths",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  death creations 
    builder.addCase(createDeath.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createDeath.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
      state.deaths.push(payload?.death);
    });
    builder.addCase(createDeath.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.message = payload?.message || payload?.error;
    });
    // get section 
    builder.addCase(getDeaths.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getDeaths.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.deaths = payload?.deaths;
    });
    builder.addCase(getDeaths.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload.error;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteDeath.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteDeath.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.death;
      state.message = payload?.message
      state.deaths = state.deaths.filter((d) => d._id !== _id);
    });
    builder.addCase(deleteDeath.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // update death status 
    builder.addCase(updateDeath.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateDeath.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.death;
      state.deaths = state.deaths.map((per) =>
        per._id === _id ? payload?.death : per
      );
      state.message = payload?.message;
    });
    builder.addCase(updateDeath.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = deathSlice;
export const selectAllDeaths = (state) => state?.deaths?.deaths;
export const getDeathstatus = (state) => state?.deaths?.deaths;
export const getDeathError = (state) => state?.deaths?.message;
export const getDeathById = (state, id) =>
  state.deaths.deaths.find((s) => s._id === id);

export const { reseter } = actions;
export default reducer;