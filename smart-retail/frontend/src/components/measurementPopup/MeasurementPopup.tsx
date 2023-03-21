import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './MeasurementPopup.scss';

import warn from '../../assets/images/Icons/warning.png'
import axios from 'axios';
import url from "../../config/SpringboorServiceUrl.json";
import { ChangeEvent } from 'react';
import {  useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth-header';
export default function MeasurementPopup(props) {
  let sizeArr=['XS','S','M','L','XL','XXL']
  let sizeNum={'XS':1,'S':2,'M':3,'L':4,'XL':5,'XXL':6}
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState("you");
  const [available,setAvailable] = React.useState(true);
  const [updateM,setUpdateM] = React.useState(false);
  const [prodCategory, setProdCategory] = React.useState("");
  const navigate = useNavigate();
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
React.useEffect(() => {
  
  axios.get(url.UserManagementService + url.GetProfile + sessionStorage.getItem('profileId') , { headers: authHeader() })
    .then((response) => {
      // console.log(response);
      var data = response.data;
    
      setUsername(data.name);
    })
    .catch((error) => {
      setUsername("you");
    })
    axios.get(url.ProductService+url.VariantById+ props.VarId).then((res) =>{
      // console.log(res.data.data.sizes[props.ScannedM-1].quantity);
      // console.log(res)
      setProdCategory(res.data.data.category);
      if(res.data.data.sizes[sizeNum[props.ProfileM]-1].quantity>0){
        setAvailable(true);
      }
      else{
        setAvailable(false);
      }
    }) 
    .catch((error) => {
      setAvailable(false);
    })
}, []);
  const handleClose = () => {
    setOpen(!open);
  };

  function handleCheck(event: ChangeEvent<HTMLInputElement>): void {
   
    setUpdateM(event.target.checked);
  }

  function handleChange() {
    let code= String(props.VarId)+props.ScannedM;
    if (updateM){
      
      axios.put(url.UserManagementService+url.UpdateMeasurement+sessionStorage.getItem('profileId')+url.UpdateShirtSize,
      {"shirt_size": sizeArr[props.ScannedM - 1]} , { headers: authHeader() }
      ).then((result) => {
        //console.log(result);      
      })
      .catch((err) => {
        console.log(err);
      });

   
  }

    navigate(`/productDetails/${prodCategory}/${code}`);
  }

  function handleNav(){
    let code= String(props.VarId)+sizeNum[props.ProfileM];
    navigate(`/productDetails/${prodCategory}/${code}`);
  }

  function backToScan(){
    window.location.reload();
  }

  return (
    <div>
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
            <img src={warn} className='warningIconMeasurement' alt='warn'/>
        </DialogTitle>
        {available===true? 
        <><DialogContent>
            <DialogContentText className='msgPopup' ><span>
              The scanned product size is '{sizeArr[props.ScannedM - 1]}'.
              The recommended size for <strong>{username}</strong> is '{props.ProfileM}'.</span>
            </DialogContentText>
          </DialogContent><DialogActions className='okClose'>

              <button className="option1" onClick={handleNav} autoFocus>
                <p className='option1Text'>change to size '{props.ProfileM}'</p>
              </button><br />
            </DialogActions><DialogActions className='okClose'>
              <button className="option2" onClick={handleChange} autoFocus>
                <p className='option2Text'>size '{sizeArr[props.ScannedM - 1]}' fits better</p>
              </button>
            </DialogActions>
            <form>
              <input type="checkbox" id="changeMeasurement" name="changeMeasurement" value="changeMeasurement" onChange={handleCheck} />
              <div className='checkboxText'>
              <label className='rememberMsg' htmlFor="changeMeasurement">Remember my choice</label>
              </div>
            </form></>:
        
        <><DialogContent>
            <DialogContentText className='msgPopup'><span>
              The scanned product size is '{sizeArr[props.ScannedM - 1]}'.
              Recommended size '{props.ProfileM}' for <strong>{username}</strong> is currently out of stock.</span>
            </DialogContentText>
          </DialogContent><DialogActions className='okClose'>

             <button className="option1" onClick={backToScan} autoFocus>
                <p className='option1Text'>go back to scanning</p>
              </button><br />
            </DialogActions><DialogActions className='okClose'>
              <button className="option2" onClick={handleChange} autoFocus>
                <p className='option2Text'>proceed with size '{sizeArr[props.ScannedM - 1]}'</p>
              </button>
            </DialogActions></>
        }
      </Dialog>
    </div>
  );
}