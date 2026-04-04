import React, { useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
  fetch("https://techiosk-backend.onrender.com/all-products")
    .then(res => res.json())
    .then(data => {
      const categoryFixed = props.category.toLowerCase().replace("s", "");

      const filtered = data.filter(item =>
        item.category.toLowerCase() === categoryFixed
      );

      setProducts(filtered);
    });
}, [props.category]);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />

      <div className="shopcategory-indexsort">
        <p>
          <span>Showing {products.length}</span> products
        </p>

        <div className="shopcategory-sort">
          Sort By <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
  {products.map((item) => (
    <Item 
      key={item._id}
      id={item._id}
      name={item.name}
      image={item.image}
      new_price={item.price}
      old_price={item.price + 100}
    />
  ))}
</div>

      <div className="shopcategory-load-more">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory