import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">BẢNG PHONG THẦN</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/artist">Artist</Link>
          </li>
          <li>
            <Link to="/drama">Drama</Link>
          </li>
           <li>
            <Link to="/drama">Type</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link to="/add-artist">Add Artist</Link>
          </li><li>
            <Link to="/add-drama">Add Drama</Link>
          </li>
        </ul>
      </nav>
    )
  }
  
  export default Navbar