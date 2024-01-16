import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/UseSlice";
import axios from "axios";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(userLogin);
    try {
      const response = await axios.post("/api/auth/login", userLogin);
      const data = response.data;
      const token = data.token;
      localStorage.setItem("token", token);
      const user = data.user;
      dispatch(login(user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className=" bg-slate-100 padding">
      <div className="max-w-[400px] mx-auto bg-white rounded-lg shadow-3xl py-16 px-8">
        <form
          className="flex flex-col justify-center gap-6"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl text-center font-medium">Sign In</h3>
          <input
            ref={emailRef}
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
          <button className="bg-black text-white py-4 mt-4" type="submit">
            Sign In
          </button>
          <p className=" text-center">
            Create an account?
            <span
              className="italic text-blue-400 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
