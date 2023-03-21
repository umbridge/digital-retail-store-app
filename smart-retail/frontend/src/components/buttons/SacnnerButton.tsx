import React from "react";
// import { RiHome2Line } from "react-icons/ri";
// import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiBarcodeReader } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./ScannerButton.scss";
const ButtonsUI = () => {
  
  return (
    <div className="buttons" data-testid="scan-button">
      <div className="homeButton">
        {/* <Link to="/">
          <RiHome2Line
            className="b_home"
          />
        </Link> */}
        <button className="scannerButton">
          <Link to="/scan">
            <BiBarcodeReader
              className="b_scan"
            />
          </Link>
        </button>
        <h3 className="scanProduct">scan product</h3>
        {/* <Link to="#">
          <AiOutlineShoppingCart
            className="b_cart"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default ButtonsUI;
