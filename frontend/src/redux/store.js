import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import productReducer from './slice/productSlice';
import orderReducer from './slice/orderSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    users: userReducer,
  },
});
