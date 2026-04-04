import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);

    useEffect(() => {
        fetch('https://techiosk-backend.onrender.com/all-products')
        .then(res => res.json())
        .then(data => setAll_Product(data));

        if(localStorage.getItem('auth-token')){
            fetch('https://techiosk-backend.onrender.com/getcart',{
                method: 'POST',
                headers: {
                            Accept: 'application/form-data', 
                            'auth-token': `${localStorage.getItem('auth-token')}`, 
                            'Content-Type': 'application/json'
                        },
                body: ""
            })
            .then(res => res.json())
            .then(data => setCartItems(data));
        }
    },[])

    const addToCart = (itemId, config) => {
  console.log("ADDING LOCAL:", itemId, config);

  setCartItems((prev) => {
    const key = itemId + "-" + config;

    if (!prev[key]) {
      return { ...prev, [key]: 1 };
    } else {
      return { ...prev, [key]: prev[key] + 1 };
    }
  });
};

    const removeFromCart = (itemId, config) => {
  const key = itemId + "-" + config;

  setCartItems((prev) => ({
    ...prev,
    [key]: prev[key] > 1 ? prev[key] - 1 : 0
  }));

        if(localStorage.getItem('auth-token')){
            fetch('https://techiosk-backend.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                            Accept: 'application/form-data', 
                            'auth-token': `${localStorage.getItem('auth-token')}`, 
                            'Content-Type': 'application/json'
                        },
                body: JSON.stringify({"itemId": itemId})
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }

    }

    const getTotalCartValue = () => {
        var total_amount = 0;
        for (const item in cartItems) {
            if(cartItems[item]>0){
                const id = item.split("-")[0]; // get real product id

let itemInfo = all_product.find((product) => product._id === id);

if(itemInfo){
  total_amount += (itemInfo.price * cartItems[item]);
}
            }
        }
        return total_amount;
    }

    const getTotalCartItems = () => {
        var total_items = 0;
        for (const item in cartItems){
            var current_item_quantity = cartItems[item];
            if(current_item_quantity>0){
                total_items += current_item_quantity;
            }
        }
        return total_items;
    }
    const updateCartQuantity = (itemId, config, type) => {
  const key = itemId + "-" + config;

  setCartItems((prev) => {
    let newQty = prev[key] || 0;

    if (type === "inc") newQty += 1;
    if (type === "dec") newQty -= 1;

    if (newQty <= 0) {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    }

    return { ...prev, [key]: newQty };
  });
};
    

    const contextValue = {
  all_product,
  cartItems,
  addToCart,
  removeFromCart,
  getTotalCartValue,
  getTotalCartItems,
  updateCartQuantity   // 🔥 THIS LINE WAS MISSING
};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;