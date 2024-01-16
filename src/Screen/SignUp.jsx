import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      fullName: fullnameRef.current.value,
      phoneNumber: phoneRef.current.value,
      address: addressRef.current.value,
    };
    try {
      await axios.post("/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className=" bg-slate-100 padding">
      <div className="max-w-[500px] mx-auto bg-white rounded-lg shadow-3xl py-16 px-8">
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl text-center font-medium">Sign Up</h3>
          <input
            ref={fullnameRef}
            type="text"
            placeholder="Fullname"
            className="h-[60px] rounded px-2 w-full focus:outline-none border-none"
            id="fullName"
          ></input>
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="Email or phone number"
            className="h-[60px] rounded px-2 border-none w-full focus:outline-none"
          ></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="h-[60px] rounded px-2 border-none focus:outline-none"
          ></input>
          <input
            id="phone-number"
            ref={phoneRef}
            type="text"
            placeholder="Phone"
            className="h-[60px] rounded px-2 border-none w-full focus:outline-none"
          ></input>
          <input
            id="address"
            ref={addressRef}
            type="text"
            placeholder="Address"
            className="h-[60px] rounded px-2 border-none w-full focus:outline-none"
          ></input>
          <button className="bg-black text-white py-4 mt-4" type="submit">
            Sign Up
          </button>
          <p className=" text-center">
            Login?{" "}
            <span
              className=" text-blue-400 italic cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Click
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
