import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormGroup, TextField } from "@mui/material";
import {
  Col,
  Form,
  Row,
} from "react-bootstrap";
import './ResetPasswordPopUp.scss';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import url from "../../config/SpringboorServiceUrl.json";

export default function ResetPasswordPopUp(props) {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
const [forgetPassData, setForgetPassData] = React.useState({
  emailID: "",

});
function handle(e: React.ChangeEvent<HTMLInputElement>): void {
  setForgetPassData({
    ...forgetPassData,
    [e.target.name]: e.target.value,
  });
  
}
  const handleCloseSendLink = (e : any) => {
    // console.log(props.deleteID);
    axios
      .post(url.AuthenticationService +url.SendMail,forgetPassData)
      .then((res) => {
          props.func(true);
           //console.log(res);
      }
      ).catch((err) => {
        props.func(false);
        // alert(err.message);
      });
        
    setOpen(!open);
    localStorage.setItem("sendEmail",forgetPassData.emailID);
    // <ForgetPassword email={forgetPassData.Email}/>
    // navigate('/forget-pass');
    

    
    
  };
  const handleCloseCancel = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <Button variant="outlined" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='titlePop' id="alert-dialog-title">
          <h2 className='PopUpLabel'>FORGOT PASSWORD</h2>
        </DialogTitle>
        <DialogContent className='popUp-content'>
          <DialogContentText className='descPop' id="alert-dialog-description">
            Please enter your registered email ID to get a link to reset your password.
          </DialogContentText><br/>
          
          <div className={"col-lg-12"}>
        
          <Form id={"contact"} onSubmit={(e) => handleCloseSendLink(e)}>
            <Row>
              <Col lg={12}>
              <FormGroup>
                  <FormControl id="Email">
                    <TextField
                      required
                      name="emailID"
                      type="email"
                      id="outlined-required"
                      label="Email-Id"
                      value={forgetPassData.emailID}
                      onChange={handle}
                    />
                  </FormControl>
                </FormGroup>
              </Col>
              </Row>
          </Form>
        
      </div>
          
          
        </DialogContent>
        <DialogActions>
          <Button className="cancel" onClick={handleCloseCancel}>CANCEL</Button>
          <Button className="delete" onClick={handleCloseSendLink} autoFocus>
            SEND 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}