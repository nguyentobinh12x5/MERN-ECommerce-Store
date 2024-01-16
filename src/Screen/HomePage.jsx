import React from "react";
import Content from "../components/Content";
import ProductsList from "../components/ProductsList";
import Addition from "../components/Addition";
import Subscribe from "../components/Subscribe";
import Carousel from "../components/Carousel";
const HomePage = () => {
  return (
    <>
      <section>
        <Carousel />
      </section>
      <section className="padding">
        <Content />
      </section>
      <section className="padding">
        <ProductsList />
      </section>
      <section>
        <Addition />
      </section>
      <section className="padding">
        <Subscribe />
      </section>
    </>
  );
};

export default HomePage;
