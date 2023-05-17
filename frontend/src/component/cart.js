import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  decreaseCartQuantity,
  increaseQuantity,
  clearCart,
  getTotal,
} from '../redux/slice/cartSlice';

function Cart() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveProduct = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncrementCart = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckOut = () => {
    const token = localStorage.getItem('token');
    token === null ? navigate('/login') : navigate('/createOrder');
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart </h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <h2>CURRENTLY CART IS EMPTY</h2>
          <Link to="/">
            <p> GO TO HOME </p>
          </Link>
        </div>
      ) : (
        <div>
          {cart.cartItems.map((item) => (
            <div key={item.id}>
              <h3>Title: {item.title}</h3>
              <p>NAME: {item.name}</p>
              <p>discription: {item.desc}</p>
              <p>
                Quantity:
                <button
                  disabled={item.cartQuantity === 1}
                  onClick={() => dispatch(decreaseCartQuantity(item))}>
                  -
                </button>
                {item.cartQuantity}
                <button onClick={() => handleIncrementCart(item)}>+</button>
              </p>
              <p>Price: {item.price}</p>

              <button
                className="button"
                onClick={() => handleRemoveProduct(item)}>
                REMOVE
              </button>
            </div>
          ))}
          <button className="btn" onClick={() => handleClearCart()}>
            <h5>CLEAR CART</h5>
          </button>
          <div className="total-amount">
            <h3>TOTAL AMOUNT :{cart.cartTotalCount}</h3>
          </div>
          <button className="button" onClick={() => handleCheckOut()}>
            CHECK OUT
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
