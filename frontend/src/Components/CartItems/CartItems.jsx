import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from "react-router-dom";   // 🔥 ADD

const CartItems = () => {

  const { all_product, cartItems, updateCartQuantity, getTotalCartValue } = useContext(ShopContext);
  const navigate = useNavigate();   // 🔥 ADD

  const cartValue = getTotalCartValue();

  return (
    <div className='cartitems'>

      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Config</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {Object.keys(cartItems).map((key) => {

        const [id, config] = key.split("-") || [];
        const product = all_product.find(p => String(p._id) === String(id));

        if (!product || cartItems[key] <= 0) return null;

        return (
          <div key={key}>
            <div className="cartitems-format cartitems-format-main">

              <img className='carticon-product-icon' src={product.image} alt="" />

              <p>{product.name}</p>

              <p>{config}</p>

              <p>${product.price || 0}</p>

              <div className="cartitems-quantity">
                <button onClick={() => updateCartQuantity(id, config, "dec")}>-</button>
                <span>{cartItems[key]}</span>
                <button onClick={() => updateCartQuantity(id, config, "inc")}>+</button>
              </div>

              <p>${(product.price || 0) * cartItems[key]}</p>

              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                alt=""
                onClick={() => {
                  const qty = cartItems[key];
                  for (let i = 0; i < qty; i++) {
                    updateCartQuantity(id, config, "dec");
                  }
                }}
              />

            </div>
            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">

        <div className="cartitems-total">
          <h1>Cart Total</h1>

          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${cartValue}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{(cartValue === 0 || cartValue > 800) ? 'Free' : '$100'}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>
                ${(cartValue === 0 || cartValue > 800) ? cartValue : cartValue + 100}
              </h3>
            </div>
          </div>

          {/* 🔥 FIXED BUTTON */}
          <button onClick={() => navigate("/checkout")}>
            PROCEED TO CHECKOUT
          </button>

        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here.</p>
          <div className='cartitems-promobox'>
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItems