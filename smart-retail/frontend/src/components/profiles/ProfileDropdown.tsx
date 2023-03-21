import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProfileDropdown.scss";
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { BsTrash } from 'react-icons/bs';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeletePopUp from '../deletePopUp/DeletePopUp';
import url from "../../config/SpringboorServiceUrl.json";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import authHeader from '../../services/auth-header';
import SuccessPopUp from '../successPopUp/SuccessPopUp';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 280,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ProfileDropdown() {
  const [profiles, setProfiles] = useState([
    {
      id: -1,
      name: ""
    }
  ])
  const [successPopup,setSuccessPopup] = useState(false);
  const { t } = useTranslation();
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState(0);
  const [deleteProfileId, setDeleteProfileId] = useState(0);
  const [manageProfile, setManageProfile] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [user, setUser] = useState();


  //   async function getDefaultUser(){
  //   await axios
  //     .get(url.UserManagementService + url.UserInfo, { headers: authHeader() })
  //     .then((res) => {
  //       console.log('User profile api')
  //       defaultId=res.data.userId;
  //       console.log(defaultId);
  //       setUser(res.data);
  //       return res.data.userId;
  //     });
  // }
  useEffect(() => {
    // const token = authService.getCurrentUser();
    // if (token) {
    //   setLoggedIn(true);
    // }
    // var defaultUserId=user.
    // console.log(user.userId);
    
    axios
      .get(url.AuthenticationService + url.UserInfo, { headers: authHeader() })
      .then((res) => {

        setUser(res.data);

        axios.get(url.UserManagementService+ url.AllProfileById + res.data.userId , { headers: authHeader() })
          .then((res) => {
            
            setProfiles(res.data);
            // console.log(res.data)
            // console.log(res.data[0].name);
            //console.log('outside if',localStorage.getItem('profileId'))
            if(sessionStorage.getItem('profileId')===null){
              //console.log("inside if");
              setSelectedProfile(res.data[0].name);
              sessionStorage.setItem("profileId", JSON.stringify(res.data[0].id));
              sessionStorage.setItem("isDefault", 'true');
            }

            else{
              // console.log('else- ',res.data.filter(profile=>profile.id.toString()===localStorage.getItem("profileId"))[0].name)
              // localStorage.setItem()
              setSelectedProfile(res.data.filter(profile=>profile.id.toString()===sessionStorage.getItem("profileId"))[0].name);
            }


          })
          .catch((error) => {
           
            console.log(error.message);
          });

        setSelectedProfile(profiles[0].name);
      
        
      })
  }, []);
  // function handleProfile(e){
  //   //  console.log(e.currentTarget.dataset);
  // }
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

  };


  function manage() {

    setManageProfile(!manageProfile);

  }
  const handleClose = (index) => {
    // e.target.innerText!=="Manage profiles"&&e.target.innerText!==""


    // String(e.target.innerText).length> 8? setSelectedProfile(e.target.innerText)
    //   : setSelectedProfile(e.target.innerText);
    console.log(typeof (index));
    if (typeof (index) === 'number') {
      setSelectedProfile(profiles[index].name);
      let id = profiles[index].id;
      setSelectedProfileId(id);
      profiles[index].name !== profiles[0].name ? sessionStorage.setItem("isDefault", "false") : sessionStorage.setItem("isDefault", "true")
      sessionStorage.setItem("profileId", JSON.stringify(profiles[index].id));
    }
    // console.log(selectedProfile);
    // console.log(selectedProfileId);
    // console.log(showPopUp);
    if (manageProfile === false) {
      setAnchorEl(null);
    }
    if (manageProfile === true && typeof (index) !== 'number') {
      setAnchorEl(null);
    }



  };

  function pull_data(data: boolean) {
    
    if (data) {
      setShowPopUp(false);
      axios
      .get(url.AuthenticationService + url.UserInfo, { headers: authHeader() })
      .then((res) => {

        setUser(res.data);

        axios.get(url.UserManagementService+ url.AllProfileById + res.data.userId , { headers: authHeader() })
          .then((res) => {
            setProfiles(res.data);
            // console.log(res.data)
            // console.log(res.data[0].name);
            setSelectedProfile(res.data[0].name);
            sessionStorage.setItem("profileId", JSON.stringify(res.data[0].id));
            sessionStorage.setItem("isDefault", 'true');


          })
          .catch((error) => {
            console.log(error.message);
          });

        setSelectedProfile(profiles[0].name);
        sessionStorage.setItem('isUpdate', JSON.stringify(false));

      })

    }
  }

  return (
    <div data-testid="profile-dropdown">
      {showPopUp === true ? <DeletePopUp deleteID={deleteProfileId} func={pull_data} /> : <></>}
      {successPopup===true?<SuccessPopUp msg={t("DeletedSuccessfully")}/>:<></>}
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownOutlinedIcon className='profileShowOptions' />}
        className="profile-button"
      >HI, {selectedProfile.length > 11 ? selectedProfile.substring(0, 11) + ".." : selectedProfile}!

      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        {
          profiles.map((profile, idx) => {

            // onChange={event=>handleProfile}
            return <div  key={idx}><MenuItem className='menuItems' onClick={() => { handleClose(idx) }} data-my-value={idx} disableRipple>
              <PersonOutlineOutlinedIcon className='otherIcons' /><span>{profile.name}   {(manageProfile === true && profile.id !== profiles[0].id) ? <BsTrash onClick={() => { setDeleteProfileId(profile.id); setShowPopUp(!showPopUp); }} className='deleteProfile' /> : <></>} {(selectedProfile === profile.name && manageProfile === false) ? <CheckCircleOutline className='checkCircle' /> : <></>}</span>

            </MenuItem>

              <Divider sx={{ my: 0.5 }} /></div>

          })
        }
        {manageProfile === false ? <div>
          <MenuItem className='menuItems' onClick={manage} disableRipple>
            <SettingsOutlinedIcon className='otherIcons' />
            Manage profiles
          </MenuItem> </div> :
          <div>
            {profiles.length>=4?<></>:
            <MenuItem className='menuItems' disableRipple>
              <Link to='/add-profile' className='addProfile'>
                <AddOutlinedIcon className='otherIcons' />
                ADD PROFILE
              </Link>
            </MenuItem>
            }
            <Divider sx={{ my: 0.5 }} />
            <MenuItem className='menuItems' onClick={manage} disableRipple>
              <CloseOutlinedIcon className='otherIcons' />
              CANCEL
            </MenuItem>
          </div>
        }

      </StyledMenu>

    </div>
  );
}