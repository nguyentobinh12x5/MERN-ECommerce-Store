import React from "react";
import {
  applewatch,
  ipad,
  macbookair,
  airpods,
  iphone,
} from "../assets/images/index";
import { Link } from "react-router-dom";
const Content = () => {
  return (
    <section id="Content" className="max-container">
      <div className=" flex flex-col justify-center items-center">
        <div className=" py-8 text-center">
          <p className="italic text-slate-gray text-md">
            CAREFULLY CREATED COLLECTIONS
          </p>
          <h3 className="font-bold text-h3">BROWSE OUR CATEGORIES</h3>
        </div>
        <div className=" flex flex-1 gap-6 w-full mb-6">
          <div className="w-[50%] flex justify-center items-center content">
            <Link to="/shop">
              <img src={iphone} className=" object-contain" width={300} />
            </Link>
          </div>
          <div className="w-[50%] flex justify-center items-center content">
            <img src={macbookair} width={300} className=" object-contain" />
          </div>
        </div>
        <div className=" flex flex-1 gap-6 mb-6">
          <div className="content">
            <img src={ipad}></img>
          </div>
          <div className="content">
            <img src={applewatch} />
          </div>
          <div className="content">
            <img src={airpods} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
