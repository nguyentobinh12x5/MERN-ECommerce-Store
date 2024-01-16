import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import convertMoney from "../convertMoney";
const ProductsList = () => {
  const { data, loading, error } = useFetch("/api/product");
  return (
    <section className="max-container" id="productlist">
      <div className="pb-4">
        <h3 className="text-h3 uppercase text-center">Top trending products</h3>
      </div>
      {loading && <div>loading...</div>}
      {!loading && error ? <div>Error</div> : null}
      {!loading && data.length ? (
        <div className="productList">
          {data.map((product, index) => (
            <div key={index} className="productItem">
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.img1}
                  alt=""
                  className="object-contain cursor-pointer w-[245px] h-[270px]"
                />
                <h4 className="font-medium h-[3em]">{product.name}</h4>
                <p className="text-slate-gray">
                  {convertMoney(product.price)} VND
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProductsList;
