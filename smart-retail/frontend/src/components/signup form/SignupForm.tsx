import React, { useState, ChangeEvent} from "react";
import axios from "axios";
import { Col, Form, Row } from "react-bootstrap";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import url from "../../config/SpringboorServiceUrl.json";
import { useTranslation } from "react-i18next";
import { BiError } from "react-icons/bi";

import { FormGroup, FormControl, TextField, Select, MenuItem, ListSubheader, InputLabel, IconButton, InputAdornment, OutlinedInput, SelectChangeEvent, Tooltip, Zoom, styled, TooltipProps, tooltipClasses } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SuccessPopUp from "../successPopUp/SuccessPopUp";
// import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../loader/Loader";

interface SignupData {
  Email: string;
  Name: string;
  Mobileno: string;
  Password: string;
  Cpassword: string;
  Cc: string;
}
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }}
     />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {"&:before": {
    border: "1px solid #CCCCCC",
  },
  color: theme.palette.common.white
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#000000',
    boxShadow: '0px 4px 9px rgba(28, 55, 197, 0.1)',
    fontSize: 11,
    maxWidth: 220,
    height: 99,
    letterSpacing: '-0.03em',
    border: '1px solid #CCCCCC',
  },
}));
const SignupForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [warning, setWarning] = useState(false);
  const [cpassNotMatchWarn, setCpassNotMatchWarn] = useState(false);
  const [invalidName,setInvalidName]=useState(false);
  const [invalidMobile,setInvalidMobile]=useState(false);
  const [warningMessage, setWarningMessage] = useState(false);
  const [passWarning, setPassWarning] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);
  const [loading,setLoading]=useState(false)
  const[loadMessage,setLoadMessage]=useState("")
  const [data, setData] = useState<SignupData>({
    Email: "",
    Name: "",
    Mobileno: "",
    Password: "",
    Cpassword: "",
    Cc: "1",
  });
  var onkeydown = keyEvent => {
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
    var nameRegex= new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    var mobileRegex=new RegExp(/^\d{10}$/);

    //console.log("+" + data.Cc + data.Mobileno);
    let response;
    if (regularExpression.test(data.Password)) {
      if(!nameRegex.test(data.Name)){
        // console.log('invalid name');
        setInvalidName(true)
      }
      else if(!mobileRegex.test(data.Mobileno)){
        setInvalidMobile(true)
      }
      else{
        if (data.Cpassword === data.Password) {
          setLoading(true);
          setLoadMessage("Creating user...")
          axios
            .post(url.AuthenticationService + url.Register, {
              name: data.Name,
              email: data.Email,
              phoneNumber: "+" + data.Cc + " " + data?.Mobileno,
              password: data.Password,
            })
            .then((res) => {
              //console.log(res.data);
              response = res.status;
              //console.log(response);
              if (response === 200) {
                setLoading(false);
                setShowPopUp(true);
                setTimeout(()=>{navigate("/signin");},1000)
                // alert(res.data.message);
                setData({
                  Email: "",
                  Name: "",
                  Mobileno: "",
                  Password: "",
                  Cpassword: "",
                  Cc: "91",
                });
                // setShowPopUp(false);
                
              }
            })
            .catch(function (error) {
              setLoading(false);
              if (error.response) {
                setWarning(true);
                // setErrorPopUp(true);
                // setTimeout(() => {
                //   setErrorPopUp(false);
                // }, 1500);
                setWarning(true);
                //console.log(error.response.data);
                //console.log(error.response.status);
                //console.log(error.response.headers);
                if (error.response.status === 400) {
                  // alert(error.response.data.message);
                  setWarningMessage(error.response.data.message);
                }
  
              }
            });
        } else {
          setCpassNotMatchWarn(true);
          // alert(t("ConfPassNotMatch"));
        }
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
  // const [showErrorPopUp, setErrorPopUp] = useState(false);

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
    setInvalidName(false);
    setInvalidMobile(false);
    // console.log(data);
  }
  function changeCc(e: SelectChangeEvent): void {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    //console.log(data.Cc);
  }

  return (
    <div data-testid="signupform">
      {/* <Loader/> */}
      
      {showPopUp===true?<SuccessPopUp msg={t("SignupSuccess")}/>:<></>}
      {/* {showErrorPopUp===true?<ErrorPopup msg={t("SignUpIssue")}/>:<></>} */}
      {loading?<Loader loadMessage={loadMessage}/>:<></>}
      <div className={"col-lg-12"} >
        <div className={"registration"}>
          <h3 className={"mb-4 mt-2"} data-testid="signupFormTitle"> {"SIGN UP"} </h3>
          <Form id={"contact"} data-testid="signupInputForm" onSubmit={(e) => submit(e)}>
            <Row>
              
              <Col lg={12}>
                <div className="input-fields">
                  <FormGroup>
                    <FormControl id="Name">
                      <TextField
                        required
                        name="Name"
                        type="text"
                        id="outlined-required"
                        label="Name"
                        value={data.Name}
                        onChange={handle}
                      />
                    </FormControl>
                  </FormGroup>
                </div>
              </Col>
              {invalidName && <p className="warning"><BiError className="errorIcon" />{t("invalidNameError")}</p>}
              <Col lg={12}>
                <FormGroup>
                  <FormControl id="Email">
                    <TextField
                      required
                      name="Email"
                      type="email"
                      id="outlined-required"
                      label="Email-Id"
                      value={data.Email}
                      onChange={handle}
                    />
                  </FormControl>
                </FormGroup>
              </Col>

              <Col lg={12}>
                <FormGroup>
                  <FormControl id="Mobileno" >
                    <Select
                      // sx={{ width: '15ch' }}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={data.Cc}
                      name="Cc"
                      onChange={changeCc}
                    >
                      <MenuItem value={"91"}>+91 India</MenuItem>
                      <MenuItem value={"1"}>+1 USA</MenuItem>
                      <ListSubheader>Other countries</ListSubheader>
                      <MenuItem value={"213"}>+213 Algeria</MenuItem>
                      <MenuItem value={"47"}>+47 Norway</MenuItem>
                      <MenuItem value={"44"}>+44 UK</MenuItem>

                    </Select><span className="mobno">
                      <TextField
                        fullWidth
                        // sx={{ width: '100ch' }}
                        required
                        name="Mobileno"
                        type="numeric"
                        id="outlined-required"
                        label="Mobile Number"
                        value={data.Mobileno}
                        onChange={handle}
                        inputMode="numeric"
                        inputProps={{ minlength: '10', maxlength: '10' }}
                      /></span>
                  </FormControl>
                </FormGroup>
              </Col>
              {invalidMobile && <p className="warning"><BiError className="errorIcon" />{t("invalidMobileError")}</p>}
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
                      <FormControl id="Password" variant="outlined" required onClick={PassInstruction}>
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
                          onKeyDown={onkeydown}
                          data-testid="SignupPass"
                        />
                      </FormControl>
                    </LightTooltip>
                  {/* </ClickAwayListener> */}
                  {/* {passIns && <div className="passInfo"><p className="passMessage">{t('PassError')}</p></div>} */}
                </FormGroup>
              </Col>
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
                      inputProps={{ minlength: '8' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
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
                      data-testid="SignupConfirmPass"
                      onKeyDown={onkeydown}
                    />
                    {capsWarning && <p className="warning"><BiError className="errorIcon" />{t('CapsOn')}</p>}
                    {warning && <p className="warning"><BiError className="errorIcon" />{warningMessage}</p>}
                    {cpassNotMatchWarn && <p className="warning"><BiError className="errorIcon" />{t("ConfPassNotMatch")}</p>}
                    {passWarning && <p className="warning"><BiError className="errorIcon" />{t("PassError")}</p>}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col lg={12}>
                <div>
                  <button className="btnSubmit" data-testid="signupButton" type={"submit"}>
                    {"SUBMIT"}
                  </button>
                </div>
              </Col>
              <Col lg={12}>
                <p className="already">
                  <span>
                    {t("AlreadyAccount")}
                    <span className="loginLink">
                      <Link to="/signin" className="signLink"> Sign-in</Link>
                    </span>
                  </span>
                </p>
              </Col>
              <Col lg={12}>
                <div>
                  <Link to={"/"}>
                    <button className="skip"  type={"submit"}>
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

export default SignupForm;
