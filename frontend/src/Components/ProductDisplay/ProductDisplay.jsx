import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  const [selectedConfig, setSelectedConfig] = useState("");
  const [showToast, setShowToast] = useState(false);
  return (
    <div className='product-display'>
      <div className="product-display-left">
        <div className="product-display-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
            <img className='product-display-img-main' src={product.image} alt="" />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="product-display-rating">
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_dull_icon} alt="" />
    <p>(122)</p>
</div>

<div className='product-display-prices'>
    <div className="product-display-oldprice">
        ${product.price + 100}
    </div>
    <div className="product-display-newprice">
        ${product.price}
    </div>
</div>

<div className="product-display-description">
    {product.description}
</div>

        {
  product.category === "phone" || product.category === "tablet"
    ? <div className="product-display-size">
  <h1>Select Configuration</h1>

  <div className="product-display-sizes">

    {product.category === "tablet" && (
      <div 
        onClick={() => setSelectedConfig("64GB")}
        className={selectedConfig === "64GB" ? "active" : ""}
      >
        64GB
      </div>
    )}

    {["128GB","256GB","512GB","1TB"].map((size) => (
      <div
        key={size}
        onClick={() => {
  console.log("clicked", size);
  setSelectedConfig(size);
}}
        className={selectedConfig === size ? "active" : ""}
      >
        {size}
      </div>
    ))}

  </div>
</div>
    : null
}

<div
  onClick={() => {
    console.log("CLICKED WORKING");

    if (
      (product.category?.toLowerCase() === "phone" || 
       product.category?.toLowerCase() === "tablet") 
      && !selectedConfig
    ) {
      alert("Please select configuration!");
      return;
    }

    addToCart(product._id, selectedConfig);

// 🔥 show popup
setShowToast(true);

setTimeout(() => {
  setShowToast(false);
}, 2000);
  }}
  style={{
    padding: "20px",
    width: "200px",
    background: "#3bc9dc",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "600"
  }}
>
  ADD TO CART
</div>
        <p className='product-display-category'><span>Category: </span> {product.category}</p>
        <p className='product-display-category'><span>Tags: </span>Latest, High Quality, Offer, Premium</p>
        {showToast && (
  <div className="toast">
    Added to Cart ({selectedConfig})
  </div>
)}
      </div>
    </div>
  )
}

export default ProductDisplay
