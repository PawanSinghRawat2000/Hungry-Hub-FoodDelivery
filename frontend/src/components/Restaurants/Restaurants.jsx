import React from 'react'
import './Restaurants.css'
import img1 from '../../images/burgerdlice.png'

const Restaurants = () => {
  return (
    <>
      <div className="restaurants">
        <h2>Restaurants</h2>
        <div className="restaurantContainer">
        <img src={img1} alt="" />
        <img src={img1} alt="" />
        <img src={img1} alt="" />
        <img src={img1} alt="" />
        </div>
        
      </div>
    </>
  )
}

export default Restaurants
