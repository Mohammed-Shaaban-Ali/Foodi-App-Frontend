import React from "react";
import Banner from "../../components/Banner";
import Catagories from "./Catagories";
import SpacialDishes from "./SpacialDishes";
import Testimonials from "./Testimonials";

function Home() {
  return (
    <div>
      <Banner />
      <Catagories />
      <SpacialDishes />
      <Testimonials />
    </div>
  );
}

export default Home;
