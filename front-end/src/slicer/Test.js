import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";


const initialState = {
  tests: [],
  status: "idle",
  message: "",
};

export const createTest = createAsyncThunk(
  "tests/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        `tests/${credentials?.patientId}`,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getTests = createAsyncThunk(
  "tests/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("tests", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const updateTest = createAsyncThunk(
  "tests/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `tests/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


export const deleteTest = createAsyncThunk(
  "tests/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDeleteHeader(
        `tests/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  tests creations 
    builder.addCase(createTest.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createTest.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
      state.tests.push(payload?.test);
    });
    builder.addCase(createTest.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.message = payload?.message || payload?.error;
    });
    // get section 
    builder.addCase(getTests.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getTests.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.tests = payload?.tests;
    });
    builder.addCase(getTests.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload.error;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteTest.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteTest.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.test;
      state.message = payload?.message
      state.tests = state.tests.filter((t) => t._id !== _id);
    });
    builder.addCase(deleteTest.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // update test status 
    builder.addCase(updateTest.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateTest.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.test;
      state.tests = state.tests.map((t) =>
        t._id === _id ? payload?.test : t
      );
      state.message = payload?.message;
    });
    builder.addCase(updateTest.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = testSlice;
export const selectAllTests = (state) => state?.tests?.tests;
export const getTeststatus = (state) => state?.tests?.tests;
export const getTestError = (state) => state?.tests?.message;
export const getTestById = (state, id) =>
  state.tests.tests.find((s) => s._id === id);

export const { reseter } = actions;
export default reducer;