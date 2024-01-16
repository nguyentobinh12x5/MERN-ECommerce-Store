import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import BASE_URL from "../hooks/baseURL";

const RelateProduct = ({ category, id }) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 3,
  });
  const { data, loading } = useFetch(
    `${BASE_URL}/product/category/${category}`
  );
  const newData = data.filter((item) => item._id !== id);
  return (
    <div className="py-8">
      <h3 className="uppercase text-xl text-center font-semibold">
        Relate Product
      </h3>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="productList">
          {newData.map((product, index) => (
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
      )}
    </div>
  );
};

export default RelateProduct;
