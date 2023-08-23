import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";


function Navbar() {
  const [dropdownOpen,setDropdownOpen]=useState(false);

  const toggleDropdown=()=>{
    setDropdownOpen(!dropdownOpen);
  }
  return (
    <>
 
    <nav className="navContainer">  
        <ul>
          <Link className="navLink" to="/">
            <li>Home</li>
          </Link>
          <Link className="navLink" to="/menu">
            <li>Menu</li>
          </Link>
          <Link className="navLink" to="/about">
            <li>About Me</li>
          </Link>
          <Link className="navLink" to="/cart">
            <li>
              Cart <span id="span">1</span>
            </li>
          </Link>
        </ul>

        <div className="navdropdown" onClick={toggleDropdown} >
          <p id="navlogo">HungryHuB</p>
          <ListIcon className="navIcon"/>
          
          {dropdownOpen && (<>
            <ul>
          <Link className="navLink" to="/">
            <li className="listItem">Home</li>
          </Link>
          <Link className="navLink" to="/menu">
            <li className="listItem">Menu</li>
          </Link>
          <Link className="navLink" to="/about">
            <li className="listItem">About Me</li>
          </Link>
          <Link className="navLink" to="/cart">
            <li className="listItem">
              Cart <span id="span">1</span>
            </li>
          </Link>
          </ul>
          </>)}
        
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
