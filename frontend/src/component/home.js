import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/cartSlice';

const Product = () => {
  useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const your_token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/api/user/product', {
        headers: {
          authorization: `Bearer ${your_token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('🚀 ~ file: home.js:21 ~ fetchData ~ response:', response);

      const data = await response.json();
      const datas = data.products;
      setData(datas);
    }
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <div className="home-container">
      <h2>ALL PRODUCT</h2>
      {data.map((item) => (
        <div className="container">
          <div className="product-card">
            <div className="showProduct">
              <div key={item.id}>
                <h3>Title: {item.title}</h3>
                <p>NAME: {item.name}</p>
                <p>discription: {item.desc}</p>
                <p>Size: {item.size}</p>
                <p>Price: {item.price}</p>
                <button
                  className="button"
                  onClick={() => {
                    handleAddToCart(item);
                  }}>
                  ADD TO Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Product;
