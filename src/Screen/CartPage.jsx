import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../features/CartSlice";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import { left, right } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/UseSlice";
const CartPage = () => {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const navigateCheckoutHandle = () => {
    if (!user) {
      return navigate("/login");
    }
    navigate("/checkoutpage");
  };
  return (
    <>
      <section className=" bg-slate-100 px-60 py-12">
        <div className="uppercase font-medium flex flex-1 justify-between items-center italic">
          <h2 className="text-3xl">Cart</h2>
          <p className="text-xl text-slate-gray">Cart</p>
        </div>
      </section>
      <section className="px-60 py-12">
        <h2 className=" uppercase font-medium pb-4 text-2xl">Shopping Cart</h2>
        <div className="flex gap-8">
          <div className="flex flex-col gap-8 w-[70%]">
            <table className="h-16">
              <tr className=" bg-slate-100">
                <th className=" w-[20%] p-4">IMAGE</th>
                <th className=" w-[20%] p-4">PRODUCT</th>
                <th className=" w-[20%] p-4">PRICE</th>
                <th className=" w-[20%] p-4">QUANLITY</th>
                <th className=" w-[20%] p-4">TOTAL</th>
                <th className=" w-[20%] p-4"> REMOVE</th>
              </tr>
              {cart &&
                cart.map((item) => <CartItem key={item.name} item={item} />)}
            </table>
            <div className="flex p-4 justify-between bg-slate-100">
              <div className="p-2 flex gap-2">
                <img src={left} alt="" width={12} height={12} />
                <button onClick={() => navigate("/shop")}>
                  Continue Shopping
                </button>
              </div>
              <div className="border p-2 border-black flex gap-2">
                <button onClick={navigateCheckoutHandle}>
                  Proceed to checkout
                </button>
                <img src={right} alt="" width={12} height={12} />
              </div>
            </div>
          </div>
          <div className="w-[30%]">
            <CartTotal />
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
