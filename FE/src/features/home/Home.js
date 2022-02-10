import * as React from "react";
import { useEffect } from "react";
import ProductHero from "./modules/views/ProductHero";
import ProductHero2 from "./modules/views/ProductHero2";
import ProductHero3 from "./modules/views/ProductHero3";

import withRoot from "./modules/withRoot";
import AOS from "aos";
import "aos/dist/aos.css";
function Index({ onIsLogin }) {
  // 로그인한 뒤 로그인됐다는 정보를 App.js에 보내주는 작업
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // setIsLogin(true);
      onIsLogin(true);
    }
  }, [onIsLogin]);

  AOS.init({
    duration: 1000,
  });
  return (
    <React.Fragment>
      <ProductHero />
      <div data-aos="fade-left">
        {" "}
        <ProductHero2 />
      </div>
      <div data-aos="fade-right">
        {" "}
        <ProductHero3 />
      </div>

      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(Index);