import React from 'react'
import SignupForm from '../../components/signup form/SignupForm'
import './Signuppage.scss'
import logo from "./../../../src/assets/images/final_logo.png";
const Signuppage = () => {
  return (
    <div className='signuppage' data-testid='signup-page'>
        <div className="header-signup" data-testid='headerSignup'>
            <img className="logoImg" data-testid='logoSignup' src={logo} alt="logo" />
        </div>
        <SignupForm/>
    </div>
  )
}

export default Signuppage