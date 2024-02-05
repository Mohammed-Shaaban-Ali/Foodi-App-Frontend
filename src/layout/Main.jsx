import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
const Main = () => {
  const { loading } = useContext(AuthContext);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
