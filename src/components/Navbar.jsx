import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = (props) => {
  const { auth, user, onLogout } = props;
  const history = useHistory();

  const handleLogout = () => {
    onLogout();
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container">
        <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">
          BUILD-LAB
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Projects
              </NavLink>
              </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Documentation
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">
                Prices
              </NavLink>
            </li>
           
       
            {auth ? (
              <>
<li className="nav-item">
  <NavLink className="nav-link" to={`/Login`}>
    Login
  </NavLink>
</li>
<li className="nav-item">
  <NavLink className="nav-link" to="/register">
    Register
  </NavLink>
</li>
</>
             
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
              sdsdsdsdsd
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/dashboard" >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
