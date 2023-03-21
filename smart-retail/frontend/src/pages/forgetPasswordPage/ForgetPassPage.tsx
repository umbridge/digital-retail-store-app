import React from 'react'
import ForgetPassword from '../../components/forgetPassword/ForgetPassword'
import logo from "./../../../src/assets/images/final_logo.png";

const ForgetPassPage = () => {
  return (
    <div data-testid="forgetpasswordpage">
        <div className='forgetPassPage'>
        <div className="header-signup">
            <img className="logoImg" src={logo} alt="logo" />
        </div>
        <ForgetPassword/>
    </div>
    </div>
  )
}

export default ForgetPassPage