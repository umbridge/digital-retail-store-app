import React from 'react'
import './HeaderComponent.scss'
import logo from "../../assets/images/final_logo.png";
import Sidebar from '../sidebar/Sidebar';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
function HeaderComponent() {
  return (
    <>
    <Sidebar />
    <div className="common-header" data-testid='commonHeader'>
      <div className="logobarCommon">
        
        <Link className="logoImgCommon" to='/' data-testid='headerLink'>
        <img  className="logoImgCommon" src={logo} alt="logo" data-testid='headerLogo'/>
        </Link>
        <HiOutlineShoppingBag data-testid='cartIcon' className="shoppingCart"/>
      </div>
        {/* <div className="header-sub-title">
            <div className="sub-title-left"><ArrowBackIosIcon/></div>
            <div className="sub-title">PRODUCT DETAILS</div>
            <div className="sub-title-right"></div>
        </div> */}
    </div>
    </>
  )
}

export default HeaderComponent