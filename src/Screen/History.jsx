import React from "react";
import { Link } from "react-router-dom";
import convertMoney from "../convertMoney";
import { useSelector } from "react-redux";
import { selectUser } from "../features/UseSlice";
import useFetchToken from "../hooks/useFetchToken";
import BASE_URL from "../hooks/baseURL";
const History = () => {
  const user = useSelector(selectUser);
  const { data, loading } = useFetchToken(
    `${BASE_URL}/order/user/${user.email}`
  );
  return (
    <div>
      <section className=" bg-slate-100 px-60 py-12">
        <div className="uppercase font-medium flex flex-1 justify-between items-center italic">
          <h2 className="text-3xl">History</h2>
          <p className="text-xl text-slate-gray">History</p>
        </div>
      </section>
      <div className="padding overflow-auto pt-20 pb-20">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-center">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                ID Order
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Delivery
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Detail
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && !data && <p>Loading...</p>}
            {!loading &&
              data &&
              data.map((value) => (
                <tr className="text-center" key={value._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {convertMoney(value.totalPrice)} VND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!value.delivery ? "Waiting for progressing" : "Processed"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!value.status ? "Waiting for pay" : "Paid"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      className="text-indigo-600 hover:text-indigo-900"
                      to={`/history/${value._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
