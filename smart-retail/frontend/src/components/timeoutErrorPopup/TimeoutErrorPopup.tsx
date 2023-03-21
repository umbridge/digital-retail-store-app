import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReportIcon from '@mui/icons-material/Report';
import './TimeoutErrorPopup.scss';
import timeoutIcon from './../../assets/images/Icons/timeoutIcon.png';

export default function TimeoutErrorPopup(props) {
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div data-testid="timeoutpopup">
      {/* <Button variant="outlined" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='titlePop' id="alert-dialog-title">
            <img className='timeoutErrorIcon' src={timeoutIcon} alt="timeoutIcon"/>
            {/* <div className='roundDivError'>
          <ReportIcon className='errorWarnIcon'/>
          </div> */}
        </DialogTitle>
        <h2 className='timeoutTitle'>Timeout error!</h2>
        <DialogContent>
          <DialogContentText className='descTimeoutPop' id="alert-dialog-description">
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='okClose'>
{/*           
          <Button className="done" onClick={handleClose} autoFocus>
            OK
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}