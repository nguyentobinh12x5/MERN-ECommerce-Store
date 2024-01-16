import React from "react";
import { Link, useParams } from "react-router-dom";
import convertMoney from "../convertMoney";
import useFetchToken from "../hooks/useFetchToken";
import BASE_URL from "../hooks/baseURL";
function DetailHistory() {
  const { id } = useParams();
  const { data, loading } = useFetchToken(
    `${BASE_URL}/order/orderdetail/${id}`
  );
  return (
    <div>
      <section className=" bg-slate-100 px-60 py-12">
        <div className="uppercase font-medium flex flex-1 justify-between items-center italic">
          <h2 className="text-3xl">Detail Order</h2>
          <p className="text-xl text-slate-gray">Detail Order</p>
        </div>
      </section>
      {loading && <p className=" text-center">Loading...</p>}
      {!loading && (
        <>
          <div className="max-container p-10">
            <h1 className="text-2xl uppercase">Information Order</h1>
            <p>Full Name: {data.fullName}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phoneNumber}</p>
            <p>Address: {data.address}</p>
            <p>Total: {convertMoney(data.totalPrice)}</p>
          </div>

          <div className="max-container overflow-x-auto pt-20 pb-20">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr className="text-center">
                  <th className="border-0 p-4" scope="col">
                    <strong className="text-xs uppercase">ID Product</strong>
                  </th>
                  <th className="border-0 p-4" scope="col">
                    <strong className="text-xs uppercase">Image</strong>
                  </th>
                  <th className="border-0 p-4" scope="col">
                    <strong className="text-xs uppercase">Name</strong>
                  </th>
                  <th className="border-0 p-4" scope="col">
                    <strong className="text-xs uppercase">Price</strong>
                  </th>
                  <th className="border-0 p-4" scope="col">
                    <strong className="text-xs uppercase">Count</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  Array.isArray(data.orderItems) &&
                  data.orderItems.map((value) => (
                    <tr className="text-center" key={value.product._id}>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value.product._id}</h6>
                      </td>
                      <td className="pl-0 border-0">
                        <div className="flex items-center justify-center">
                          <Link
                            className="block"
                            to={`/shop/${value.product._id}`}
                          >
                            <img
                              src={value.product.img1}
                              alt="..."
                              width="200"
                            />
                          </Link>
                        </div>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value.product.name}</h6>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">
                          {convertMoney(value.product.price)}
                        </h6>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value.quantity}</h6>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailHistory;
