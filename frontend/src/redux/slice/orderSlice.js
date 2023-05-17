import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getToken } from './helper';
import axios from 'axios';

// get order for admin
export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (id = null, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${url}/admin/order`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//edit status of order by admin
// export const editOrder = createAsyncThunk(
//   'orders/editOrder',
//   async (formValues, { rejectWithValue }) => {
//     try {
//       const token = getToken();
//       const response = await axios.put(
//         `${url}/admin/order/${formValues._id}`,
//         formValues,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//create order for user
export const orderCreate = createAsyncThunk(
  'products/productsCreate',
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/user/order`, formValues);
      console.log('🚀 ~ file: orderSlice.js:26 ~ response:', response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  orderItems: [],
  orderStatus: null,
  createOrderStatus: null,
  // editOrderStatus: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrder.fulfilled]: (state, action) => {
      state.orderStatus = 'success';
      state.orderItems = action.payload;
    },

    //create product
    [orderCreate.pending]: (state, action) => {
      state.createOrderStatus = 'pending';
    },
    [orderCreate.fulfilled]: (state, action) => {
      state.orderItems.push(action.payload);
      state.createOrderStatus = 'success';
    },
    [orderCreate.rejected]: (state, action) => {
      state.createOrderStatus = 'rejected';
    },
  },
});

export default orderSlice.reducer;
