// import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import {
  Col,
  Form,
  Row,
} from "react-bootstrap";
import "./Signin.scss";
import { Link, useNavigate } from "react-router-dom";
// import url from "../../config/SpringboorServiceUrl.json";
import { BiError} from "react-icons/bi";
import { useTranslation } from "react-i18next";

import AuthService from "../../services/auth.service";
import { FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SuccessPopUp from "../successPopUp/SuccessPopUp";
import ResetPasswordPopUp from "../restPasswordPopUp/ResetPasswordPopUp";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../loader/Loader";
interface SigninData {
  Email: string;
  Password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [capsWarning,setCapsWarning]=useState(false);
  const [warning,setWarning]=useState(false);
  const [passIns,setPassIns]=useState(false);
  const [sentMail,setSentMail]=useState(false);
  const [notSentMail,setNotSentMail]=useState(false);
  var onkeydown = keyEvent => {
    if (keyEvent.getModifierState("CapsLock")) {
      setCapsWarning(true );
    } else {
      setCapsWarning(false );
    }
  };
  const [showPass, setShowPass] = useState(false);
  
  function toggle() {
    // Toggle the state variable
    setShowPass(!showPass);
  }
  function PassInstruction() {
    // Toggle the state variable
    setPassIns(!passIns);
  }
  

  const [loginData, setLoginData] = useState<SigninData>({
    Email: "",
    Password: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  // const [showErrorPopUp, setErrorPopUp] = useState(false);
  const [showForgetPopUp, setShowForgetPopUp] = useState(false);
  const [loading,setLoading]=useState(false)
  const[loadMessage,setLoadMessage]=useState("")
  function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    setLoadMessage("Loading...")
    AuthService.login(loginData.Email, loginData.Password).then(
      (response) => {
        if (response.status === 200) {
          setLoading(false);
          setShowPopUp(true);
          if(sessionStorage.getItem('TryonNotSignedIn')==="true" && sessionStorage.getItem('barcode')){
            setTimeout(()=>{
              sessionStorage.setItem('TryonNotSignedIn',String(false))
              // navigate("/virtual-try-on");
              navigate(`/productDetails/${sessionStorage.getItem('category')}/${sessionStorage.getItem('barcode')}`);
            },1000);
            
            setLoginData({
              Email: "",
              Password: "",
            });
          }
          else{
            setTimeout(()=>{
              navigate("/");
            },1000);
            setLoginData({
              Email: "",
              Password: "",
            });
          }
          // setShowPopUp(false);
        }
      },
      (error) => {
        setLoading(false);
        // setErrorPopUp(true);
        //   setTimeout(()=>{
        //     setErrorPopUp(false);
        //   },1500);
        setWarning(true);
        //console.log(error.response.data);
        //console.log(error.response.status);
        // alert(error.response.data.message);
      }
    );
  }
  function pull_data(data: boolean) {
    if(data){
       setSentMail(true);
       setTimeout(()=>{
        setSentMail(false);
      },1500);
    }
    else{
      setNotSentMail(true);
      setTimeout(()=>{
        setNotSentMail(false);
      },1500);
    }
  }
  function handle(e: ChangeEvent<HTMLInputElement>): void {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setWarning(false);
  }

  return (
    <div data-testid='signinForm'>
      {showPopUp===true?<SuccessPopUp msg={t("LoginSuccess")}/>:<></>}
      {sentMail===true?<SuccessPopUp msg={t("MailSuccess")}/>:<></>}
      {notSentMail===true?<ErrorPopup msg={t("MailIssue")}/>:<></>}
      
      {/* {showErrorPopUp===true?<ErrorPopup msg={t("SignUpIssue")}/>:<></>} */}
      {loading?<Loader loadMessage={loadMessage}/>:<></>}
      {showForgetPopUp===true?<ResetPasswordPopUp func={pull_data}/>:<></>}
      <div className={"col-lg-12"}>
        <div className={"registration"}>
          <h3 className={"mb-4 mt-2"}> {"SIGN IN"} </h3>
          <br />
          <br />
          <Form id={"contact"} onSubmit={(e) => submit(e)}>
            <Row>
              <Col lg={12}>
              <FormGroup>
                  <FormControl id="Email">
                    <TextField
                      required
                      name="Email"
                      type="email"
                      id="outlined-required"
                      label="Email-Id"
                      value={loginData.Email}
                      onChange={handle}
                    />
                  </FormControl>
                </FormGroup>
              </Col> 
              
              <Col lg={12}>
              <FormGroup>
                  <FormControl id="Password" variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    {/* <InputLabel htmlFor="outlined-adornment-password"><span>PASSWORD <BsInfoCircle className="passInfoIcon" onClick={PassInstruction} /></span></InputLabel>
                    {passIns && <div className="passInfo"><p className="passMessage">{t('PassError')}</p></div>} */}
                    <OutlinedInput
                      name="Password"
                      id="outlined-adornment-password"
                      type={showPass ? 'text' : 'password'}
                      value={loginData.Password}
                      onChange={handle}
                      inputProps={{ minlength: '8' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggle}
                            onMouseDown={toggle}
                            edge="end"
                          >
                            {!showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="PASSWORD  "
                      onKeyDown={onkeydown}
                    />
                    {capsWarning && <p className="warning"><BiError className="errorIcon"/>{t('CapsOn')}</p>}
                    {warning && <p className="warning"><BiError className="errorIcon"/>{t('SigninWarning')}</p>}
                  </FormControl>
                </FormGroup>
              </Col>
              <Link to="#" onClick={()=>{setShowForgetPopUp(!showForgetPopUp)}}>
                <p className="forgotPassword">Forgot password?</p>
              </Link>
              <Col lg={12}>
                <div>
                  <button className="btnSubmit" type={"submit"}>
                    {"SUBMIT"}
                  </button>
                </div>
              </Col>
              <Col lg={12}>
                <p className="already"><span>
                  {t("NotHaveAccount")+" "} 
                  <span className="loginLink">
                    <Link to="/signup" className="signLink"> Sign-up</Link>
                  </span>
                  </span>
                </p>
                <br />
                <br />
                <br />
              </Col>

              <Col lg={12}>
                <div>
                  <Link to={"/"} >
                    <button className="skip" type={"submit"}>
                      {t("ToShopping")}
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
