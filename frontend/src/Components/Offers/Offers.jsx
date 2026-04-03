import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/offers.png'
const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>TECHIOSK DEALS</h1>
        <h2>Upto 30% off</h2>
        <p>Valid Until 1st May 2026</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
