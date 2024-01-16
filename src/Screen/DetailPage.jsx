import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTocart } from "../features/CartSlice";
import useFetch from "../hooks/useFetch";
import RelateProduct from "../components/RelateProduct";
import { useDispatch } from "react-redux";
import convertMoney from "../convertMoney";
import BASE_URL from "../hooks/baseURL";
const DetailPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = params.productId;
  const { data, loading, error } = useFetch(`${BASE_URL}/product/${productId}`);
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const images = [data.img1, data.img2, data.img3, data.img4];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  return (
    <section className="padding max-container" id="product-detail">
      {loading && <div>Loading...</div>}
      {!loading && error && <div>{error}</div>}
      {!loading && data && (
        <>
          <div>
            <div
              key={data._id}
              className="max-container flex flex-col sm:flex-row gap-8 justify-center"
            >
              <div className="w-full sm:w-1/2">
                <div className=" bg-gray-100 rounded-lg">
                  <div className="p-6">
                    <img src={data.img1} alt="" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 w-[20%] pt-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="image-product"
                      className="object-contain cursor-pointer border-2 rounded-lg transform hover:scale-110 transition-transform duration-200"
                    />
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-1/2 italic">
                <h3 className=" text-[32px] font-medium">{data.name}</h3>
                <p className=" text-2xl  py-4 text-slate-gray">
                  {convertMoney(data.price)} VND
                </p>
                <p className=" py-4 text-slate-gray">{data.short_desc}</p>
                <div className="flex gap-2 pb-4">
                  <p className="font-bold">CATEGORY</p>
                  <p className=" text-slate-gray">{data.category}</p>
                </div>
                {data.count > 0 && (
                  <>
                    <button
                      className="py-2 px-4 bg-black text-white"
                      onClick={() =>
                        dispatch(addTocart({ item: data, quantity: quantity }))
                      }
                    >
                      Add to cart
                    </button>
                    <button className="py-2 px-4" onClick={handleDecrease}>
                      -
                    </button>

                    <span>{quantity}</span>

                    <button className="py-2 px-4" onClick={handleIncrease}>
                      +
                    </button>
                  </>
                )}
                {data.count === 0 && (
                  <div className="text-red-500">Out of stock</div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="uppercase text-xl py-8 text-center font-semibold">
              Product Description
            </h3>
            <p className="text-slate-gray italic whitespace-pre-wrap">
              {data.long_desc}
            </p>
          </div>
          <RelateProduct category={data.category} id={data._id} />
        </>
      )}
    </section>
  );
};

export default DetailPage;
