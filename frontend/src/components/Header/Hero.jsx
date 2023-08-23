import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./Hero.css";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";


function Hero() {
  const [dropdownOpen,setDropdownOpen]=useState(false);

  const toggleDropdown=()=>{
    setDropdownOpen(!dropdownOpen);
  }
  return (
    <>
    <div className="wrapper">
    <nav className="heroContainer">  
        <ul>
          <Link className="link" to="/">
            <li>Home</li>
          </Link>
          <Link className="link" to="/menu">
            <li>Menu</li>
          </Link>
          <Link className="link" to="/about">
            <li>About Me</li>
          </Link>
          <Link className="link" to="/cart">
            <li>
              Cart <span id="span">1</span>
            </li>
          </Link>
        </ul>

        <div className="dropdown" onClick={toggleDropdown} >
          <ListIcon className="heroIcon"/>
        
          {dropdownOpen && (<ul>
          <Link className="link" to="/">
            <li className="herolistItem">Home</li>
          </Link>
          <Link className="link" to="/menu">
            <li className="herolistItem">Menu</li>
          </Link>
          <Link className="link" to="/about">
            <li className="herolistItem">About Me</li>
          </Link>
          <Link className="link" to="/cart">
            <li className="herolistItem">
              Cart <span id="span">1</span>
            </li>
          </Link>
          </ul>)}
        
        </div>
      </nav>
      <p className="heroText">HungryHuB</p>
    </div>
      
    </>
  );
}

export default Hero;
