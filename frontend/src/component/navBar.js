import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navb() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.users.item.email);
  return (
    <nav className="nav-bar">
      <Link reloadDocument to="/">
        <h2>ECOM</h2>
      </Link>
      {/* search */}
      <Link to="search">
        <div className="bi-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input type="search" />
        </div>
      </Link>

      {/* login user email */}

      <div style={{ color: 'white' }}>{user}</div>

      {/* cart */}

      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16">
            <path
              d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 
        1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 
        5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"
            />
          </svg>

          <span className="bag-quantity">
            <span>{cart.quantity}</span>
          </span>
        </div>
      </Link>
    </nav>
  );
}

export default Navb;
