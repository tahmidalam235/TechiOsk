import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'

const Popular = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("https://techiosk-backend.onrender.com/all-products")
      .then(res => res.json())
      .then(data => {
        const phones = data.filter(item => item.category === "phone")
        setProducts(phones)
      })
  }, [])

  return (
    <div className="popular">
      <h1>POPULAR SMARTPHONES</h1>
      <hr />
      <div className="popular-item">
        {products.map((item,i) => {
          return (
  <Item 
    key={item._id}
    id={item._id}
    name={item.name}
    image={item.image}
    new_price={item.price}
    old_price={item.price + 100}
  />
)
        })}
      </div>
    </div>
  )
}

export default Popular