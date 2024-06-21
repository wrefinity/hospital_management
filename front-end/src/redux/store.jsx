import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slicer/Auth"
import productReducer from "../slicer/Products"
import categoryReducer from "../slicer/Category"
import userReducer from "../slicer/UserSlice"
import orderReducer from "../slicer/Orders"
import dashboardReducer from "../slicer/Dashboard"
import testReducer from "../slicer/Test"
import deathReducer from "../slicer/Death"
import historyReducer from "../slicer/Medical"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    categories: categoryReducer,
    products: productReducer,
    users: userReducer,
    orders: orderReducer,
    dashboard:dashboardReducer,
    histories:historyReducer,
    tests:testReducer,
    deaths:deathReducer,
  },
})