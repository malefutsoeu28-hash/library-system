import { NavLink } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">

      <h2>Community Library</h2>

      <div className="nav-links">

        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/books">
          Books
        </NavLink>

        <NavLink to="/transactions">
          Transactions
        </NavLink>

        <NavLink to="/users">
          Users
        </NavLink>

        <button onClick={onLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;