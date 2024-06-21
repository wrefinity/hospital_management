import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";


const initialState = {
  histories: [],
  status: "idle",
  message: "",
};

export const createMedicalHistory = createAsyncThunk(
  "histories/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        `histories/${credentials?.patientId}`,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getMedicalHistories = createAsyncThunk(
  "histories/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("histories", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const updateMedicalHistory = createAsyncThunk(
  "histories/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `histories/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


export const deleteMedicalHistory = createAsyncThunk(
  "histories/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDeleteHeader(
        `histories/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const medicalHistorySlice = createSlice({
  name: "histories",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  histories creations 
    builder.addCase(createMedicalHistory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createMedicalHistory.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
      state.histories.push(payload?.history);
    });
    builder.addCase(createMedicalHistory.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.message = payload?.message || payload?.error;
    });
    // get section 
    builder.addCase(getMedicalHistories.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getMedicalHistories.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.histories = payload?.histories;
    });
    builder.addCase(getMedicalHistories.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload.error;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteMedicalHistory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteMedicalHistory.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.history;
      state.message = payload?.message
      state.histories = state.histories.filter((h) => h._id !== _id);
    });
    builder.addCase(deleteMedicalHistory.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // update histories status 
    builder.addCase(updateMedicalHistory.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateMedicalHistory.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.history;
      state.histories = state.histories.map((his) =>
        his._id === _id ? payload?.histories : his
      );
      state.message = payload?.message;
    });
    builder.addCase(updateMedicalHistory.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = medicalHistorySlice;
export const selectAllHistories = (state) => state?.histories?.histories;
export const getHistorytatus = (state) => state?.histories?.histories;
export const getHistoryError = (state) => state?.histories?.message;
export const getHistoryById = (state, id) =>
  state.histories.histories.find((h) => h._id === id);

export const { reseter } = actions;
export default reducer;