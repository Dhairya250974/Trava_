import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Router from "./../router/Router";

const Layout = () => {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
};

export default Layout;