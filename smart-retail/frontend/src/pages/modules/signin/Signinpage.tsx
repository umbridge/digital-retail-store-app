import React from "react";
import Signin from "../../../components/signin/Signin";
import logo2 from "./../../../assets/images/final_logo.png";
import "./Signinpage.scss";


const Signinpage = () => {
  return (
    <div data-testid='signin-page'>
      <div className="logobar" data-testid='headerSignin'>
        <img className="logoImg" data-testid='logoSignin' src={logo2} alt="logo" />
      </div>
      <Signin />
    </div>
  );
};

export default Signinpage;
