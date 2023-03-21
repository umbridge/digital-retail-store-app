import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReportIcon from '@mui/icons-material/Report';
import './ErrorPopup.scss';

export default function ErrorPopup(props) {
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div >
      {/* <Button variant="outlined" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="errorpopup"
      >
        <DialogTitle className='titlePop' id="alert-dialog-title" data-testid="errorIcon">
            <div className='roundDivError'>
          <ReportIcon className='errorWarnIcon' />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='descPop' id="alert-dialog-description" data-testid="errorDesc">
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