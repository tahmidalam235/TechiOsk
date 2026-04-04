import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import hero_image from '../Assets/iphone.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate();

  return (
    <div className='hero'>
      <div className="hero-left">

        <div>
          <div className="hero-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Gadgets</p>
          <p>For Everyone</p>
        </div>

        <div 
          className="hero-latest-button"
          onClick={() => navigate('/phones')}   // 🔥 ALL PRODUCTS PAGE
          style={{ cursor: "pointer" }}
        >
          <div>Browse Products</div>
        </div>

      </div>

      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero