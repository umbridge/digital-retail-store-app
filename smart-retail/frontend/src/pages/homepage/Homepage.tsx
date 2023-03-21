import React from "react";
import PosterCarousel from "../../components/carousel/PosterCarousel";


import logo from "../../assets/images/final_logo.png";
import "./Homepage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import ScanButton from "../../components/buttons/SacnnerButton";
import { HiOutlineShoppingBag } from "react-icons/hi";
const Homepage = () => {

  return (
    <div data-testid="homepage">
      <Sidebar />
      <div className="logobar">
        
        <img className="logoImg" src={logo} alt="logo" />
        <HiOutlineShoppingBag className="shoppingCart"/>
      </div>
      <div>
        <div className="homepage">
          <PosterCarousel />
        </div>
      </div>
      <br />

      <ScanButton />
    </div>
  );
};

export default Homepage;
