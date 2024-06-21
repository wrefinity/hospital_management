import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./requestHandler";



const initialState = {
  products: [],
  status: "idle",
  message: "",
};

export const createProducts = createAsyncThunk(
  "products/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioPostHeader(
        "drugs",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/get_all",
  async (_, ThunkAPI) => {
    try {
      const res = await requestHandler.axioGet("drugs");
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `drugs/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDelete(
        `drugs/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

// Increment stock
export const incrementProduct = createAsyncThunk(
  "products/increment",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const { _id, quantity } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `drugs/increment/${_id}`,
        { quantity },
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

// Decrement stock
export const decrementProduct = createAsyncThunk(
  "products/decrement",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const { _id, quantity } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `drugs/decrement/${_id}`,
        { quantity },
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  product creations 
    builder.addCase(createProducts.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload?.message;
      state.products.push(payload?.drug);
    });
    builder.addCase(createProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.message = payload?.message || payload?.error || payload;
    });
    // get section 
    builder.addCase(getProducts.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.products = payload?.drugs;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload.error || payload;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.product;
      state.message = payload?.message
      state.products = state.products.filter((p) => p._id !== _id);
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
      state.status = "idle";
    });

    // update product status 
    builder.addCase(updateProduct.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.drug;
      state.products = state.products.map((pro) =>
        pro._id === _id ? payload?.drug : pro
      );
      state.message = payload?.message;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
      state.status = "idle";
    });

    // Increment product stock
    builder.addCase(incrementProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(incrementProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.drug;
      state.products = state.products.map((p) => 
        p._id === _id ? payload?.drug : p
      );
      state.message = payload?.message;
    });
    builder.addCase(incrementProduct.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
    });

    // Decrement product stock
    builder.addCase(decrementProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(decrementProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.drug;
      state.products = state.products.map((p) => 
        p._id === _id ? payload?.drug : p
      );
      state.message = payload?.message;
    });
    builder.addCase(decrementProduct.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.message || payload?.error || payload;
    });
  }
});

const { reducer, actions } = productSlice;
export const selectAllProducts = (state) => state?.products?.products;
export const getProductStatus = (state) => state?.products?.status;
export const getProductError = (state) => state?.products?.message;
export const getProductById = (state, id) =>
  state.products.products.find((pro) => pro._id === id);

export const { reseter } = actions;
export default reducer;