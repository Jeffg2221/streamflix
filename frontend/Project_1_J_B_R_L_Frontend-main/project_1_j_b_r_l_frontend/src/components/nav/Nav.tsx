import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import UserDropdown from '../user-dropdown/UserDropdown';
import svg from '../../SF-logo-no-bg.svg';
import './Navbar.css';
const Nav: React.FC = () => {
    

    return (
        <nav className="navbar sticky-top bg-dark nabar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                
              <Link className="navbar-brand" to="/">
                <img src={svg} className="d-inline-block align-text-top" width="30" height="30"/>StreamFlix
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" aria-current="page">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="movies">All Movies</Link>
                </li>
                <li className="nav-item">
                  <UserDropdown />
                </li>
            </ul>
            </div>
            </div>
        </nav>
    );
};

export default Nav;

