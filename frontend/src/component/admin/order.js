import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { url, getToken } from '../../redux/slice/helper';
import { fetchOrder } from '../../redux/slice/orderSlice';
import React from 'react';

function Order() {
  const [formData, setFormData] = useState();
  console.log('🚀 ~ file: order.js:9 ~ Order ~ formData:', formData);

  // let navigate = useNavigate();

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderItems);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch, formData]);

  const handleStatusChange = async (e, itemId) => {
    const { name, value } = e.target;
    const updatedOrderData = orderData.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    // Update the state with the updated orderData
    setFormData(updatedOrderData);

    const token = getToken();
    try {
      const response = await fetch(`${url}/admin/order/${itemId}`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: value }),
      });

      if (response.ok) {
        console.log('Order status updated successfully');
      } else {
        console.log('Error updating order status');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>order</h1>
      <div>
        {orderData?.map((item) => (
          <div key={item._id}>
            <h4>UserId : {item.userId}</h4>
            {item.products.map((product) => (
              <div style={{ margin: '10px' }}>
                <h4>Product Name :{product.productName}</h4>
                <h4>Product id: {product.productId}</h4>
                <h4>Product quantity :{product.quantity}</h4>
              </div>
            ))}
            <h4>ADDRESS : {item.address}</h4>

            <select
              name="status"
              onChange={(e) => handleStatusChange(e, item._id)}>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <p>Status: {item.status}</p>

            <p>Total Price:{item.totalPrice}</p>
            <p>-----------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
