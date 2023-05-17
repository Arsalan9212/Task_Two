import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalCount: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart', // by this name we identify cartSlice
  initialState: initialStateValue,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const lefted = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = lefted;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.title === action.payload.title;
      });

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    increaseQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.title === action.payload.title;
      });
      state.cartItems[itemIndex].cartQuantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    getTotal(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalCount = total;
      state.quantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  increaseQuantity,
  clearCart,
  getTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
