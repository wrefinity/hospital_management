import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";
const API_URL = "users";

const initialState = {
  users: [],
  status: "idle",
  message: "",
};

export const getUsers = createAsyncThunk(
  "users/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      return await requestHandler.axioGetHeader(`${API_URL}`, token);
    } catch (error) {
      const message = thunkError(error)
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (credentials, ThunkAPI) => {
    try {
      const { _id, ...rest } = credentials;
      const token = getToken(ThunkAPI)
      return requestHandler.axioPatchHeader(`${API_URL}/${_id}`, rest, token);
    } catch (error) {
      const message = thunkError(error)
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      return requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials._id}`,
        token
      );
    } catch (error) {
      const message = thunkError(error)
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder)=> {
    //  get users
    builder.addCase(getUsers.pending, (state, _)=>{
      state.status = "loading";
    });
    builder.addCase(getUsers.rejected, (state, {payload})=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    builder.addCase(getUsers.fulfilled, (state, {payload})=>{
      state.status = "succeeded";
      state.status = "idle";
      state.users = payload?.data?.users;
    });
    //  update users
    builder.addCase(updateUser.pending, (state, _)=>{
      state.status = "loading";
    });
    builder.addCase(updateUser.rejected, (state, {payload})=>{
      state.status = "failed";
      state.mesage = payload;
    });
    builder.addCase(updateUser.fulfilled, (state, {payload})=>{
      state.status = "succeeded";
      state.users.map((s) => (payload.user._id === s._id ? payload.user : s));
    });
    //  delete users
    builder.addCase(deleteUser.pending, (state, _)=>{
      state.status = "loading";
    });
    builder.addCase(deleteUser.rejected, (state, {payload})=>{
      state.status = "failed";
      state.mesage = payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, {payload})=>{
      state.status = "succeeded";
      state.message = payload?.mesage
      state.users.filter((us) => us._id !== payload?.user?._id);
    });
  }
});
export const fetchUsers = (state) => state?.users?.users;
export const getUsersById = (state, id) =>
  state.users.users.find((c) => c.id === id);
export const { reseter } = userSlice.actions;
export default userSlice.reducer;