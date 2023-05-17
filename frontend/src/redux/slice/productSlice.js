import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url, getToken } from './helper';

export const fetchData = createAsyncThunk(
  'products/fetchData',
  async (id = null, { getState, rejectWithValue }) => {
    try {
      // const token = getState().users.token;
      const token = getToken();
      const response = await axios.get(`${url}/admin/product`, {
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

// export const fetchAdminSideData = createAsyncThunk(
//   'products/fetchAdminSideData',
//   async (id = null, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${url}/admin/product`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const productsCreate = createAsyncThunk(
  'products/productsCreate',
  async (formValues, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${url}/admin/product`, formValues, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('🚀 ~ file: productSlice.js:27 ~ response:', response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (formValues, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${url}/admin/put/${formValues._id}`,
        formValues,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProducts',
  async (formValues) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${url}/admin/delete/${formValues}`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  item: [],
  status: null,
  createStatus: null,
  editStatus: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.item = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = 'rejected';
    },

    //create product
    [productsCreate.pending]: (state, action) => {
      state.createStatus = 'pending';
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.item.push(action.payload);
      state.createStatus = 'success';
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = 'rejected';
    },

    //edit product
    [editProduct.pending]: (state, action) => {
      state.editStatus = 'pending';
    },
    [editProduct.fulfilled]: (state, action) => {
      state.editStatus = 'success';

      const updateItem = action.payload;
      const itemIndex = state.item.products.findIndex(
        (item) => item._id === updateItem._id
      );
      if (itemIndex !== -1) {
        state.item[itemIndex] = updateItem;
      }
    },
    [editProduct.rejected]: (state, action) => {
      state.editStatus = 'rejected';
    },

    //delete product
    [deleteProduct.pending]: (state, action) => {
      state.createStatus = 'pending';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.createStatus = 'success';
      // state.item = state.item.filter((item) => item._id !== action.payload._id);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.createStatus = 'rejected';
    },
  },
});

export default productSlice.reducer;
