import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const Checkout = () => {
  const { getTotalCartValue } = useContext(ShopContext);
  const total = getTotalCartValue();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields!");
      return;
    }

    alert("Order Placed Successfully 🚀");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        background: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}
      >
        {/* 🔥 TEST */}
        <h1 style={{ color: "red", textAlign: "center" }}>
          CHECKOUT PAGE WORKING
        </h1>

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Checkout
        </h2>

        <h3 style={{ marginBottom: "15px" }}>Total: ${total}</h3>

        <h4>Shipping Info</h4>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="checkout-input"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="checkout-input"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="checkout-input"
          value={form.phone}
          onChange={handleChange}
        />

        <button className="checkout-btn" onClick={handleOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;