import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const ShopPage = () => {
  const { data, loading, error } = useFetch("/api/product");
  const [category, setCategory] = useState();
  const [displayDefault, setdisPlayDefault] = useState(true);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 3,
  });
  const filteredData = data.filter((product) => product.category === category);
  const displayData = displayDefault || category === "" ? data : filteredData;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="padding">
        <div className="max-container flex gap-12 justify-center">
          <div className=" w-1/5 italic max-md:hidden">
            <h3 className=" font-medium text-2xl uppercase pb-10">
              Categories
            </h3>
            <h4 className=" uppercase bg-black text-white text-xl py-2 px-4 font-medium">
              Apple
            </h4>
            <h4
              className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4"
              onClick={() => setCategory("")}
            >
              All
            </h4>
            <h4 className="shopPageh4">Iphone & Mac</h4>
            <ul>
              <li
                className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4"
                onClick={() => {
                  setCategory("iphone");
                  setdisPlayDefault(false);
                }}
              >
                Iphone
              </li>
              <li
                className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4"
                onClick={() => {
                  setCategory("ipad");
                  setdisPlayDefault(false);
                }}
              >
                Ipad
              </li>
              <li className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4">
                Macbook
              </li>
            </ul>
            <h4 className="shopPageh4">WireLess</h4>
            <ul>
              <li
                className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4"
                onClick={() => {
                  setCategory("airpod");
                  setdisPlayDefault(false);
                }}
              >
                Aripod
              </li>
              <li
                className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4"
                onClick={() => {
                  setCategory("watch");
                  setdisPlayDefault(false);
                }}
              >
                Watch
              </li>
            </ul>
            <h4 className="shopPageh4">Other</h4>
            <ul>
              <li className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4">
                Mouse
              </li>
              <li className="cursor-pointer hover:text-yellow-500 text-slate-gray py-2 px-4">
                Keyboard
              </li>
            </ul>
          </div>
          <div className=" w-4/5">
            <div className="flex items-center justify-between flex-1 gap-8 mb-6 max-sm:flex-col">
              <div className="w-[40%] p-2.5 border border-slate-300">
                <input
                  placeholder="Enter Search Here"
                  className=" focus:outline-none"
                ></input>
              </div>
              <select name="sort">
                <option>Default sorting</option>
                <option value="iphone">Iphone</option>
                <option value="ipad">Ipad</option>
                <option value="macbook">Macbook</option>
                <option value="airpod">Airpods</option>
              </select>
            </div>
            <div className="productList">
              {displayData.map((product, index) => (
                <div key={index} className="productItem">
                  <Link to={`/shop/${product._id}`}>
                    <img
                      src={product.img1}
                      alt=""
                      className="object-contain cursor-pointer"
                    />
                    <h4 className="font-medium">{product.name}</h4>
                    <p className=" italic text-slate-gray">
                      {formatter.format(product.price)} VND
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
