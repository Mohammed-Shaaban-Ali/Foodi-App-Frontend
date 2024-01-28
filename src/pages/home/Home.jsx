import React from "react";
import Banner from "../../components/Banner";
import Catagories from "./Catagories";
import SpacialDishes from "./SpacialDishes";
import Testimonials from "./Testimonials";
import OurServices from "./OurServices";

function Home() {
  return (
    <div>
      <Banner />
      <Catagories />
      <SpacialDishes />
      <Testimonials />
      <OurServices />
    </div>
  );
}

export default Home;
