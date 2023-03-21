import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import './DeletePopUp.scss';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import SuccessPopUp from '../successPopUp/SuccessPopUp';
import url from "../../config/SpringboorServiceUrl.json";
import authHeader from '../../services/auth-header';

export default function DeletePopUp(props) {
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
  const [successPopup,setSuccessPopup] = React.useState(false);
  const { t } = useTranslation();
  const handleCloseDelete = () => {
    setOpen(!open);

    
    // console.log(props.deleteID);
    axios
      .delete(url.UserManagementService+url.DeleteProfile+props.deleteID , { headers: authHeader() })
      .then((res) => {
          
          setSuccessPopup(true);
              setTimeout(()=>{setSuccessPopup(!successPopup)},1100);
              props.func(true);
              // alert("Profile deleted successfully!");
      })
      .catch((err)=>{
        props.func(false);
        // console.log(err.message);
      });
  };
  const handleCloseCancel = () => {
    setOpen(!open);
  };

  return (
    <div>{successPopup===true?<SuccessPopUp msg={t("DeletedSuccessfully")}/>:<></>}
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
          <ReportProblemRoundedIcon className='warningIcon'/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='descPop' id="alert-dialog-description">
            Are you sure you want to delete this profile ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="cancel" onClick={handleCloseCancel}>CANCEL</Button>
          <Button className="delete" onClick={handleCloseDelete} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}