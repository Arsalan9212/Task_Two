import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productsCreate } from '../../redux/slice/productSlice';

function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: '',
    title: '',
    desc: '',
    size: '',
    price: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(productsCreate(formValues));
    navigate('/admin');
    console.log(formValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="desc"
            value={formValues.desc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>size:</label>
          <input
            type="number"
            name="size"
            value={formValues.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      <Link to="/admin">
        <button className="button">HOME</button>
      </Link>
    </div>
  );
}

export default CreateProduct;
