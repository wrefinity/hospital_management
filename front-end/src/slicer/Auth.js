import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";


const API_URL = "auth";
export const gettate = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) return undefined;
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};

const initialState = {
  user: gettate(),
  status: "idle",
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await requestHandler.axioPost(`${API_URL}/register`, credentials);
      return res?.data;
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      // Validate that loginData is not empty
      if (!loginData || !loginData.email || !loginData.password) {
        return rejectWithValue("Email and password are required");
      }
      
      const res = await requestHandler.axioPost(`${API_URL}/login`, loginData);
      return res?.data;
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);

// Login user
export const resetLink = createAsyncThunk(
  "auth/reset_link",
  async (resetInfo, { rejectWithValue }) => {
    try {
      return await requestHandler.axioPost(`${API_URL}/reset-link`, resetInfo);
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);
// reset_password
// export const resetPassword = createAsyncThunk(
//   "auth/reset",
//   async (resetInfo, { rejectWithValue }) => {
//     try {
//       const { token, id, password } = resetInfo
//       return await requestHandler.axioPost(`${API_URL}/reset_password/${id}/${token}`, { password });
//     } catch (error) {
//       return rejectWithValue(thunkError(error));
//     }
//   }
// );
export const resetPassword = createAsyncThunk(
  "auth/reset",
  async  (credentials, ThunkAPI)  => {
    try {
      const token = getToken(ThunkAPI);
      const res =  await requestHandler.axioPostHeader(`${API_URL}/reset-password`, credentials, token);
      return res?.data
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);
export const confirmEmail = createAsyncThunk(
  "user/confirmation",
  async (resetInfo, { rejectWithValue }) => {
    try {
      const { token, id } = resetInfo
      return await requestHandler.axioPost(`${API_URL}/confirm/${id}/${token}`);
    } catch (error) {
      return rejectWithValue(thunkError(error));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, ThunkAPI) => {
  try {
    return await requestHandler.axioGet(`${API_URL}/logout`);
  } catch (error) {
    return ThunkAPI.rejectWithValue(thunkError(error));
  }
});


export const updateProfile = createAsyncThunk(
  "user/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioPatchHeader(
        `auth/profile`,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
      window.location.href = '/login'; 
    },
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // register section 
    builder.addCase(register.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message
    });
    // login section
    builder.addCase(login.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.status = "failed";
      console.log("=====", payload, "=====")
      state.message = payload?.message || payload?.error || payload;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
      state.status = "idle"
    });
    // updateProfile
    builder.addCase(updateProfile.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
    });
    // confirm section 
    builder.addCase(confirmEmail.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(confirmEmail.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.user = null;
    });
    builder.addCase(confirmEmail.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      console.warn(payload)
      localStorage.setItem("user", JSON.stringify(payload.data));
      state.user = payload.data;
    });
    // logout section 
    builder.addCase(logout.fulfilled, (state, _) => {
      state.user = null;
    });

    // resetPassword section 
    builder.addCase(resetPassword.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload.message || payload.error || payload;
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
    });
    // resetLink section
    builder.addCase(resetLink.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(resetLink.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
    builder.addCase(resetLink.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.data?.message;
    });
  }
});
export const getUser = (state) => state?.auth;
export const getCurrentUser = (state) => state?.auth?.user;
export const { setLogout, reseter } = authSlice.actions;
export default authSlice.reducer;