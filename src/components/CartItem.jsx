import React from "react";
import { trash } from "../assets/icons/index";
import {
  deleteTocart,
  decreaseTocart,
  increaseTocart,
} from "../features/CartSlice";
import { useDispatch } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import convertMoney from "../convertMoney";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDecrease = () => {
    dispatch(decreaseTocart(item));
    if (item.quantity === 1) {
      dispatch(deleteTocart(item));
    }
  };
  return (
    <tr>
      <td>
        <img src={item.img1} alt="" width={100} height={100} className="mt-4" />
      </td>
      <td className=" text-center">{item.name}</td>
      <td className=" align-middle text-center">
        {convertMoney(item.price)} VND
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center">
          <FaAngleLeft onClick={handleDecrease} />
          <div className="mx-2">{item.quantity}</div>
          <FaAngleRight onClick={() => dispatch(increaseTocart(item))} />
        </div>
      </td>
      <td className=" align-middle text-center">
        {convertMoney(item.productTotal)} VND
      </td>
      <td className=" align-middle text-center">
        <img
          src={trash}
          alt=""
          width={16}
          height={16}
          className=" block m-auto cursor-pointer"
          onClick={() => dispatch(deleteTocart(item))}
        />
      </td>
    </tr>
  );
};

export default CartItem;
