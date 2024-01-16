import React from "react";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
const RootLayout = () => {
  return (
    <>
      <Nav></Nav>
      <main>
        <Outlet />
      </main>
      <section className="padding bg-black">
        <Footer />
      </section>
    </>
  );
};

export default RootLayout;
