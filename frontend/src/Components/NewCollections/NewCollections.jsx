import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {

  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch("https://techiosk-backend.onrender.com/all-products")
      .then(res => res.json())
      .then(data => setNew_Collection(data));
  }, [])

  return (
    <div className='new-collections'>
      <h1>RECENTLY ADDED</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => {
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

export default NewCollections