import React, { ChangeEvent, useState } from 'react';
import axios from "axios";
import { Col, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import url from "../../config/SpringboorServiceUrl.json";
import { useTranslation } from "react-i18next";
import { BiError } from "react-icons/bi";

import { FormGroup, FormControl, InputLabel, IconButton, InputAdornment, OutlinedInput, Tooltip, Zoom, styled, TooltipProps, tooltipClasses } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SuccessPopUp from "../successPopUp/SuccessPopUp";
import "./ForgetPassword.scss";
import ErrorPopup from "../ErrorPopup/ErrorPopup";


const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      border: "1px solid #CCCCCC",
    },
    color: theme.palette.common.white
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#000000',
    boxShadow: '0px 4px 9px rgba(28, 55, 197, 0.1)',
    fontSize: 12,
    maxWidth: 220,
    height: 99,
    letterSpacing: '-0.03em',
    border: '1px solid #CCCCCC',
  },
}));

const ForgetPassword = (props) => {



  const navigate = useNavigate();
  const { t } = useTranslation();
  const [warning, setWarning] = useState(false);
  const [cpassNotMatchWarn, setCpassNotMatchWarn] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);
  const [passWarning, setPassWarning] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);
  const [showErrorPopUp, setErrorPopUp] = useState(false);
  const [data, setData] = useState({
    Email: localStorage.getItem('sendEmail'),
    Password: "",
    Cpassword: "",
  });
  function onkeydown(keyEvent) {
    if (keyEvent.getModifierState("CapsLock")) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };
  function submit(e: any) {
    //console.log(data);
    e.preventDefault();
    var regularExpression = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);


    let response;
    if (regularExpression.test(data.Password)) {
      if (data.Cpassword === data.Password) {
        axios
          .post(url.AuthenticationService + url.ResetPassword, {

            email: data.Email,
            newPassword: data.Password,
          })
          .then((res) => {
            //console.log(res.data);
            response = res.status;
            //console.log(response);
            if (response === 200) {
              setShowPopUp(true);
              setTimeout(() => { navigate("/signin"); }, 1000)
              // alert(res.data.message);
              sessionStorage.setItem("sendEmail", "");
              setData({
                Email: "",
                Password: "",
                Cpassword: "",
              });
              // setShowPopUp(false);

            }
          })
          .catch(function (error) {
            if (error.response) {
              setWarning(true);
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response.status === 400) {
                // alert(error.response.data.message);

                setWarningMessage(error.response.data.message);
              }

            }
            setErrorPopUp(true);
            setTimeout(() => {
              setErrorPopUp(false);
            }, 1500);

          });
      } else {
        setCpassNotMatchWarn(true);
        // alert(t("ConfPassNotMatch"));
      }
    } else {
      setPassWarning(true);
      // alert(t("PassError"));
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passIns, setPassIns] = useState(false);
  const passInstructions = ["Password must contain minimum :", "• 8 characters in total", "• one number", "• one uppercase and lowercase character", "• one special character"];
  const tip = passInstructions.join('\n')
  const [showPopUp, setShowPopUp] = useState(false);

  function PassInstruction() {
    // Toggle the state variable 
    //console.log("before passIns was : "+ passIns);
    setPassIns(true);
    //console.log("set passIns to  : "+ passIns);
    //console.log("we show ins")
  }
  function hidePassInstruction() {
    //console.log("before passIns was : "+ passIns);
    setPassIns(false);
    //console.log("set passIns to : "+ passIns);
    //console.log("we hide ins");
  }
  function togglePass() {
    // Toggle the state
    setShowPassword(!showPassword);
  }
  function toggleConfirmPass() {
    // Toggle the state
    setShowConfirmPassword(!showConfirmPassword);
  }
  function handle(e: ChangeEvent<HTMLInputElement>): void {
    // const newData : SignupData= { ...data };

    // newData[e.target.id] = e.target.value;
    // setData(newData);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setWarning(false);
    setCpassNotMatchWarn(false);
    setPassWarning(false);
    // console.log(data);
  }


  return (
    <div data-testid="forgetpasswordcomponent">
      {showPopUp === true ? <SuccessPopUp msg={t("ChangePasswordSuccess")} /> : <></>}
      {showErrorPopUp === true ? <ErrorPopup msg={"Cannot Save Password !!..."} /> : <></>}
      <div className={"col-lg-12"}>
        <div className={"forgetPassDiv"}>

          <h3 className={"mb-4 mt-2"}> {"RESET PASSWORD"} </h3>

          <Form id={"contact"} onSubmit={(e) => submit(e)} data-testid="forgetpassform">
            <Row>

              <Col lg={12}>
                <FormGroup >
                  {/* <ClickAwayListener onClickAway={hidePassInstruction}> */}
                  <LightTooltip onBlur={hidePassInstruction}
                    arrow
                    placement="bottom-end"
                    open={passIns}
                    TransitionComponent={Zoom}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={<p className="pass-ins" style={{ whiteSpace: 'pre-line' }}>{tip}</p>}>
                    <FormControl id="Password" variant="outlined" required onClick={PassInstruction} data-testid="focus-input">
                      <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                      {/* <InputLabel htmlFor="outlined-adornment-password"><span>PASSWORD <BsInfoCircle className="passInfoIcon" onClick={PassInstruction} /></span></InputLabel> */}

                      <OutlinedInput
                        name="Password"
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={data.Password}
                        onChange={handle}
                        inputProps={{ minlength: '8' }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              data-testid="show-hide-pass"
                              aria-label="toggle password visibility"
                              onClick={togglePass}
                              onMouseDown={togglePass}
                              edge="end"
                            >
                              {!showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </LightTooltip>
                  {/* </ClickAwayListener> */}
                  {/* {passIns && <div className="passInfo"><p className="passMessage">{t('PassError')}</p></div>} */}
                </FormGroup>
              </Col><br />
              <Col lg={12}>
                <FormGroup>
                  <FormControl id="Cpassword" variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      name="Cpassword"
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={data.Cpassword}
                      onChange={handle}
                      onKeyDown={onkeydown}
                      inputProps={{ minlength: '8' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            data-test-id = "show-hide-confirm-pass"
                            aria-label="toggle password visibility"
                            onClick={toggleConfirmPass}
                            onMouseDown={toggleConfirmPass}
                            edge="end"
                          >
                            {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="CONFIRM PASSWORD  "
                    />
                    {capsWarning && <p className="warning"><BiError className="errorIcon" />{t('CapsOn')}</p>}
                    {warning && <p className="warning"><BiError className="errorIcon" />{warningMessage}</p>}
                    {cpassNotMatchWarn && <p className="warning"><BiError className="errorIcon" />{t("ConfPassNotMatch")}</p>}
                    {passWarning && <p className="warning"><BiError className="errorIcon" />{t("PassError")}</p>}
                  </FormControl>
                </FormGroup>
              </Col><br />
              <Col lg={12}>
                <div>
                  <button className="btnSubmitPass" type={"submit"}>
                    {"SUBMIT"}
                  </button>
                </div>
              </Col>

            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}


export default ForgetPassword