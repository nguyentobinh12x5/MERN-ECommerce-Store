import React from "react";

const Subsribe = () => {
  return (
    <section
      className="max-container flex justify-between items-center gap-10 max-sm:flex-col py-6 sm:py-12"
      id="contact-us"
    >
      <div>
        <h3 className=" text-2xl font-bold uppercase">Let's be friends!</h3>
        <p className="leading-normal italic text-slate-gray pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          voluptates!
        </p>
      </div>
      <div className="lag-max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full">
        <input
          type="text"
          placeholder="subscribe@nike.com"
          className="input"
        ></input>
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <button className="bg-black text-white px-4 py-4 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subsribe;
