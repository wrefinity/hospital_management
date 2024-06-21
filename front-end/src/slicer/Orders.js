import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";


const initialState = {
  orders: [],
  status: "idle",
  message: "",
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        "orders/place",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("orders", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `orders/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);
export const approveOrder = createAsyncThunk(
  "orders/approve",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id} = credentials;
      const res = await requestHandler.axioPatchHeader(
        `orders/approve/${_id}`,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);
export const declineOrder = createAsyncThunk(
  "orders/decline",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id} = credentials;
      const res = await requestHandler.axioPatchHeader(
        `orders/decline/${_id}`,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDeleteHeader(
        `orders/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  product creations 
    builder.addCase(createOrder.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
      state.orders.push(payload?.order);
    });
    builder.addCase(createOrder.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.message = payload?.message || payload?.error;
    });
    // get section 
    builder.addCase(getOrders.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.orders = payload?.orders;
    });
    builder.addCase(getOrders.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload.error;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteOrder.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteOrder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.order;
      state.message = payload?.message
      state.orders = state.orders.filter((p) => p._id !== _id);
    });
    builder.addCase(deleteOrder.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // update product status 
    builder.addCase(updateOrder.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.order;
      state.orders = state.orders.map((per) =>
        per._id === _id ? payload?.order : per
      );
      state.message = payload?.message;
    });
    builder.addCase(updateOrder.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // approve order 
    builder.addCase(approveOrder.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(approveOrder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.order;
      state.orders = state.orders.map((per) =>
        per._id === _id ? payload?.order : per
      );
      state.message = payload?.message;
    });
    builder.addCase(approveOrder.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });

    // decline 
    builder.addCase(declineOrder.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(declineOrder.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.order;
      state.orders = state.orders.map((per) =>
        per._id === _id ? payload?.order : per
      );
      state.message = payload?.message;
    });
    builder.addCase(declineOrder.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = orderSlice;
export const selectAllOrders = (state) => state?.orders?.orders;
export const getOrdertatus = (state) => state?.orders?.orders;
export const getOrderError = (state) => state?.orders?.message;
export const getOrderById = (state, id) =>
  state.orders.orders.find((s) => s._id === id);

export const { reseter } = actions;
export default reducer;