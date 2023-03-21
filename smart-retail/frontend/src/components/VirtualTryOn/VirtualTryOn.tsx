
import axios from 'axios';
import './VirtualTryOn.scss'
import { saveAs } from 'file-saver';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import LoopIcon from '@mui/icons-material/Loop';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import WarningIcon from '@mui/icons-material/Warning';
import SuccessPopUp from '../successPopUp/SuccessPopUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import url from "../../config/SpringboorServiceUrl.json";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import TimeoutErrorPopup from '../timeoutErrorPopup/TimeoutErrorPopup';
import ImageUploadGuidelines from '../ImageUploadGuidelines/ImageUploadGuidelines';
import AddIcon from '@mui/icons-material/Add';

function VirtualTryOn() {

    const navigate = useNavigate();

    const [img_file, setImg_file] = useState<File>();

    const [expanded, toggleExpanded] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [userImage, setUserImage] = useState("");
    const [showErrorPopUp, setErrorPopUp] = useState(false);
    const [tryonErrorPopUp, setTryonErrorPopUp] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadMessage, setLoadMessage] = useState("")
    const [imageSizeError, setImageSizeError] = useState(false);
    const [tryonImageUrl, setTryonImageUrl] = useState("")
    const [profileID,setProfileID]= useState("");
    const { t } = useTranslation();
    let profileId= sessionStorage.getItem('profileId');
    
    useEffect(() => {
        
        console.log(profileId)
            axios.get(url.GetImage+sessionStorage.getItem('profileId')+'.png')
            .then((res)=>{
                if(!res.data.match("<Error>")){
                    
                setUserImage(("data:image/jpeg;base64,"+res.data));
                tryonvirtully()
                }
                else{
                    console.log("hello")

                }
            })
            .catch(err=>{
                
                console.log(err)
            })
            sessionStorage.setItem('TryonNotSignedIn',String(false));
           
        if(!sessionStorage.getItem('profileId')){
            sessionStorage.setItem('TryonNotSignedIn',String(true));
        }
        
        // axios.get(url.GetImage + sessionStorage.getItem('profileId') + '.png')
        //     .then((res) => {
        //         console.log("inside then")
        //         setUserImage(url.GetImage + sessionStorage.getItem('profileId') + '.png' + "?demo=" + Math.random())
        //         tryonvirtully()
        //         console.log("user image retrieved : ")
        //     })
        //     .catch(err => {
        //         if (err.response.status === 0) {
        //             console.log("image found")
        //             setUserImage(url.GetImage + sessionStorage.getItem('profileId') + '.png' + "?demo=" + Math.random())
        //             tryonvirtully()
        //             console.log("user image retrieved : ")
        //         }
        //         else {
        //             console.log("image not found")
        //         }
        //     })
    }, [profileId])

    const handleToggle = () => {
        toggleExpanded(!expanded);
    }

    function popup() {
        setShowPopUp(!showPopUp);
    }

    const uploadImage = () => {
        var element: HTMLElement = document.getElementById("image-upload-input-box")!;
        element.click();
        handleClose();
    }

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files[0].size > 10000000) {
                setImageSizeError(true);
            }
            else {
                setUserImage(URL.createObjectURL(event.target.files[0]))
                setImageSizeError(false);
                setLoading(true);
                setLoadMessage("Uploading new Image...")
                axios.put(url.ImageUploadApi + sessionStorage.getItem('profileId') + ".png", event.target.files[0], {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `image/png`,
                    }
                })
                    .then((res) => {
                        console.log("inside onhandleChange function")
                        setLoading(false);
                        generateMetadata();
                    })
                    .catch(error => {
                        setLoading(false);
                        setErrorPopUp(true);
                        setTimeout(() => {
                            setErrorPopUp(false);
                        }, 1500);
                    })
            }
        }
    }

    const generateMetadata = () => {
        let user_id = sessionStorage.getItem('profileId') + ".png";
        console.log("user image input parameter", user_id)
        setLoading(true);
        setLoadMessage("Uploading your Image...");
        axios.post(url.GenerateMetadata, {
            "Input": user_id
        })
            .then((res) => {
                console.log("then inside generating metadata ")
                console.log("response", res.data);
                let code_status = res.status;
                console.log(code_status);
                if (code_status === 200) {
                    console.log("human pose keypoints generated : ", url.GetMetadata + res.data + "_keypoints.json")
                    setLoading(false);
                    tryonvirtully()
                }
            })
            .catch(error => {
                setLoading(false);
                setTryonErrorPopUp(true);
                console.log("catch inside generating metadata ")
                setTimeout(() => {
                    setTryonErrorPopUp(false);
                }, 3500);
            })
    }

    const tryonvirtully = () => {
        let user_id = sessionStorage.getItem('profileId');
        let prod_id = sessionStorage.getItem("productImageName") + ".png";

        console.log("user image input parameter", user_id)
        console.log("cloth image input parameter", prod_id)

        setLoading(true);
        setLoadMessage("Processing Image...");
        axios.post(url.VirtualTryOnApi, {
            "Input": [user_id, prod_id]
        })
            .then((res) => {
                console.log("inside tryon Virtually then")
                console.log("response", res.data);
                let code_status = res.status;
                console.log(code_status);
                if (code_status === 200) {
                    console.log("tryon image path before setting : ", url.GetTryonImage + res.data)
                    setTryonImageUrl(url.GetTryonImage + res.data)
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setTryonErrorPopUp(true);
                console.log("inside tryon Virtually catch")
                setTimeout(() => {
                    setTryonErrorPopUp(false);
                }, 3500);
            })
    }

    const goBackToScanning = () => {
        var element = document.getElementById("back-to-scanning-button")!
        element.click();
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const downloadImage = () => {
        console.log(tryonImageUrl)
        saveAs(tryonImageUrl, 'image.png')
    }

    return (
        <div data-testid="virtual-try-on-page">
            <HeaderComponent />
            {showPopUp === true ? <SuccessPopUp msg={t("ImageUploadSuccess")} /> : <></>}
            {showErrorPopUp === true ? <ErrorPopup msg={t("CantSaveData")} /> : <></>}
            {tryonErrorPopUp === true ? <TimeoutErrorPopup msg={t("TimeoutMsg")} /> : <></>}
            {loading ? <Loader data-testid="loader" loadMessage={loadMessage} /> : <></>}
            <div className='virtual-tryon-page'>
                <div className='tryon-top-section'>
                    <div className='tryon-top-section-left'>
                        <ArrowBackIosIcon sx={{ color: "#000E57" }} onClick={handleGoBack} />
                    </div>
                    <div className='tryon-top-section-right'>
                        VIRTUAL TRY ON
                    </div>
                </div>
                {AuthService.getCurrentUser() ? <>
                    {userImage === "" ?
                        <div className='tryon-mid-section'>

                            <div className='tryon-comment'>
                                {t('TryOnInstrusction')}
                            </div>

                            <div className='expandable-guideline-tab' onClick={handleToggle}>
                                <div className='guidelines-tab-left'>Guidelines for image upload</div>
                                <div className='guidelines-tab-right'>{expanded ? <RemoveIcon className='remove-icon'/> : <AddIcon className='remove-icon'/>}</div>
                            </div>

                            {expanded ?
                                <ImageUploadGuidelines /> : userImage === "" ?
                                    <div className='add-photo-icon'>
                                        <AddAPhotoIcon sx={{ fontSize: 250, color: '#ABABAB' }} onClick={uploadImage} />
                                    </div> :
                                    <div className='user-image-section'>
                                        <img src={tryonImageUrl + "?demo=" + Math.random()} alt="user" className="user-image" />
                                    </div>}

                        </div>
                        :
                        <div className='virtual-image-container'>
                            <div className='virtual-image-options'>
                                <Button
                                    data-testid="menu-button"
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon sx={{ color: "black" }} />
                                </Button>
                                <Menu
                                    data-testid = "open-side-menu"
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={downloadImage} data-testid = "save-result-image"><DownloadIcon sx={{ marginRight: '6px' }} /> Save Image</MenuItem>
                                    <MenuItem onClick={uploadImage}><LoopIcon sx={{ marginRight: '6px' }} /> Change Image</MenuItem>
                                </Menu>
                            </div>
                            <img src={tryonImageUrl + "?demo=" + Math.random()} className='virtual-image' />
                        </div>}

                    <div className='tryon-bottom-section'>
                        {userImage === "" ? <button className='tryon-buttons tryon-upload-image-button' onClick={uploadImage}>{"UPLOAD IMAGE FOR TRY ON"}</button> : <></>}
                        <input type="file" id="image-upload-input-box" accept="image/**" onChange={handleOnChange}></input>
                        <button className='tryon-buttons tryon-skip-button' onClick={goBackToScanning}>{"GO BACK TO SCANNING"}</button>
                        <Link to="/scan" id="back-to-scanning-button"></Link>
                    </div></>
                    :
                    // ********** else condition ******* 
                    <div className="tryon-mid-section">
                        <div className="tryon-login-icon">
                            <WarningIcon sx={{ fontSize: '80px', color: '#9C1C8F' }} />
                        </div>
                        <div className="tryon-login-msg">
                            Sign in to your account to view the product in virtual try on mode.
                        </div>
                        <Link to="/signin">
                            <div className="tryon-login-button-container">
                                <button className='tryon-login-button'>SIGN IN</button>
                            </div>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default VirtualTryOn





