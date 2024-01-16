import React, { useState, useCallback, useMemo } from "react";
import CartTotal from "../components/CartTotal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectAmount, selectCart } from "../features/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/UseSlice";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectAmount);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userinfor, setUserinfor] = useState(user);
  const handleChange = useCallback(
    (e) => {
      setUserinfor({ ...userinfor, [e.target.id]: e.target.value });
    },
    [userinfor]
  );
  const placeOrderHandle = useCallback(async () => {
    try {
      const newOrder = {
        fullName: userinfor.fullName,
        email: userinfor.email,
        phoneNumber: userinfor.phoneNumber,
        address: userinfor.address,
        orderItems: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        totalPrice: totalAmount,
      };
      const token = localStorage.getItem("token");

      await axios.post("/api/order/create", newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.post("/api/order/getbill", newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(clearCart());
      navigate("/history");
    } catch (err) {
      console.log(err);
    }
  }, [userinfor, cart, totalAmount, dispatch, navigate]);
  return (
    <section className="px-60 py-12">
      <h3 className="text-h3">Billing name</h3>
      <div className=" flex gap-8">
        <div className="w-[70%]">
          <h4 className="text-h4 mt-8">Full name</h4>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Your Full Name Here!"
            className="input-checkout"
            onChange={handleChange}
            value={userinfor.fullName}
          ></input>
          <h4 className="text-h4">Email</h4>
          <input
            type="email"
            id="email"
            placeholder="Entern Your Email Here"
            className="input-checkout"
            onChange={handleChange}
            value={userinfor.email}
          ></input>
          <h4 className="text-h4">Phone Number</h4>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Enter Your Phone Number Here"
            className="input-checkout"
            onChange={handleChange}
            value={userinfor.phoneNumber}
          ></input>
          <h4 className="text-h4">Address</h4>
          <input
            id="address"
            type="text"
            placeholder="Enter Your Address Here!"
            className="input-checkout"
            onChange={handleChange}
            value={userinfor.address}
          ></input>
          <button
            className="p-4 bg-black text-white text-lg"
            onClick={placeOrderHandle}
          >
            Place Order
          </button>
        </div>
        <div className="w-[30%]">
          <CartTotal />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
