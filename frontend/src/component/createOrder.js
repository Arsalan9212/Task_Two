import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderCreate } from '../redux/slice/orderSlice';
import { clearCart } from '../redux/slice/cartSlice';

function CreateOrder() {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.users.item.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userId,
    name: '',
    address: '',
    cart,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(orderCreate(formValues));

    dispatch(clearCart());

    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
      </form>
      {/* <button className="button">CANCEL</button> */}
      <button className="button" onClick={handleSubmit}>
        DONE
      </button>
    </div>
  );
}

export default CreateOrder;
