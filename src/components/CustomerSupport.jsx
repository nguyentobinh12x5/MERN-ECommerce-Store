import React from "react";

const CustomerSupport = () => {
  return (
    <div className="shadow-4xl rounded-lg bg-white">
      <div className="p-8 ">
        <div className="flex justify-between pb-4 items-center">
          <p className=" font-medium text-lg">Customer Support</p>
          <p className=" bg-slate-100 p-2">Let's Chat App</p>
        </div>
        <div className="border-t">
          <div className="flex flex-col justify-center items-end">
            <div>
              <p className="inline-block bg-blue-300 p-2 mt-2 text-end rounded-sm">
                Xin chào
              </p>
            </div>
            <div>
              <p className=" inline-block bg-blue-300 p-2 mt-2 text-end rounded-sm">
                Làm thế nào để xem các sản phẩm
              </p>
            </div>
          </div>
          <div>
            <p className="inline-block bg-slate-100 p-2 mt-2 text-end rounded-sm">
              Chào bạn
            </p>
          </div>
          <div>
            <p className="inline-block  bg-slate-100 p-2 mt-2 text-start rounded-sm">
              Bạn có thể vào mục Shop để xem các sản phẩm
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-4 bg-slate-100 p-4">
        <input className="p-2 border" placeholder="Enter Message!"></input>
      </div>
    </div>
  );
};

export default CustomerSupport;
