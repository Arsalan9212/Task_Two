import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, fetchData } from '../../redux/slice/productSlice';

function Product() {
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState(false);

  const userData = useSelector((state) => state.products.item.products);
  // console.log('🚀 ~ file: product.js:10 ~ Product ~ userData:', userData);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setDeleted(true);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, deleted]);

  return (
    <div>
      <div className="heading">
        <h2>All Product</h2>
        <Link to="/createProduct">
          <button className="button">Create</button>
        </Link>
        <Link to="/order">
          <button className="button">Order</button>
        </Link>
      </div>

      {userData?.map((item) => (
        <div className="container">
          <div className="product-card">
            <div className="showProduct">
              <div key={item._id}>
                <h3>Title: {item.title}</h3>
                <p>NAME: {item.name}</p>
                <p>discription: {item.desc}</p>
                <p>Size: {item.size}</p>
                <p>Price: {item.price}</p>
                <p>Active: {`${item.isActive}`}</p>
                <Link to={`/editProduct/${item._id}`}>
                  <button className="button">EDIT</button>
                </Link>

                <button
                  className="button"
                  onClick={() => handleDelete(item._id)}>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
