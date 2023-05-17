import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editProduct } from '../../redux/slice/productSlice';

function EditForm() {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const form = useSelector((state) =>
    state.products.item.products.find((item) => item._id === id)
  );

  const [formData, setFormData] = useState(form);
  console.log('🚀 ~ file: editProduct.js:13 ~ EditForm ~ formData:', formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(formData));
    navigate('/admin');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleChange}
      />
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleChange}
      />
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="desc"
          value={formData?.desc}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>size:</label>
        <input
          type="number"
          name="size"
          value={formData?.size}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Active:</label>
        <input
          type="text"
          name="isActive"
          value={formData?.isActive}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData?.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditForm;
