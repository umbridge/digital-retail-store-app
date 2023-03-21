import React, { useEffect, useState } from 'react'
import './PersonalDetails.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../services/auth.service';
// import authHeader from '../../services/auth-header';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import url from "../../config/SpringboorServiceUrl.json";
import { useTranslation } from 'react-i18next';
import SuccessPopUp from '../../components/successPopUp/SuccessPopUp';
import Loader from '../../components/loader/Loader';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { BiError } from 'react-icons/bi';
import ImageUploadGuidelines from '../../components/ImageUploadGuidelines/ImageUploadGuidelines';
import RemoveIcon from '@mui/icons-material/Remove';
import authHeader from '../../services/auth-header';
import AddIcon from '@mui/icons-material/Add';

function PersonalDetails() {
  const { t } = useTranslation();
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [mobile, setMobile] = useState("")
  const [imageUrl, setImageUrl] = useState("");
  const [userImage, setUserImage] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading,setLoading]=useState(false)
  const[loadMessage,setLoadMessage]=useState("")
  const [showErrorPopUp, setErrorPopUp] = useState(false);
  const[imageSizeError,setImageSizeError]=useState(false);
  const [tryonErrorPopUp, setTryonErrorPopUp] = useState(false);
  const[imageExpanded,toggleExpanded]=useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files) {
      
      if(event.target.files[0].size>10000000){
        setImageSizeError(true);
       
      }

      else{        
        setImageSizeError(false);
        setLoading(true);
        setLoadMessage("Uploading your Image...")
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        // if(event.target.files[0].size<=10000000){
        axios.put(url.ImageUploadApi + sessionStorage.getItem('profileId') + ".png", event.target.files[0], {
          headers: {
            'accept': 'application/json',
            'Content-Type': `image/png`,
          }
        })
          .then((res) => {
            
            setLoading(false);
            generateMetadata()
            //console.log(res);
            setUserImage(true);
            setTimeout(() => {
              setUserImage(false);
            }, 1000);
          })
          .catch(error => {
            setLoading(false);
            setErrorPopUp(true);
                setTimeout(() => {
                  setErrorPopUp(false);
                }, 1500);
          })
        // }
        // else{
        //   console.log(event.target.files[0].size,"Image size greater than 10Mbs!!!..");
        //   setLoading(false);
        // }
      }


    }

  }


  const handleImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.getElementById('personal-user-image')?.click();
  }

  var date = new Date();
  // var maxDate = `${(date.getFullYear() - 12).toString()}-${date.getMonth().toString()}-${date.getDay().toString()}`
  var maxDate = `${(date.getFullYear() - 10).toString()}-${(date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():'0'+(date.getMonth()+1).toString()}-${date.getDay().toString().length===2?date.getDay().toString():'0'+date.getDay().toString()}`
  // console.log(maxDate);
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDob(e.target.value);
  }

  function saveInfoHandler() {
    //console.log("save");
    setLoading(true);
    setLoadMessage("Saving Profile...")

    axios.put(url.UserManagementService + url.ProfileByID + sessionStorage.getItem('profileId') , {

      gender: gender,
      date_of_birth: dob
    } , { headers: authHeader() }).then((response) => {
    setLoading(false);
      if (response.status === 200) {
        setShowPopUp(true);
        setTimeout(() => {
          navigate("/");
          setShowPopUp(false);
        }, 1000);
        // alert("data uploaded Successfully");
        setEditable(false);
      }
    }).catch((error) => {
      //console.log(error);
      setLoading(false);
      setErrorPopUp(true);
    })

  }

  const generateMetadata = () => {
    let user_id = sessionStorage.getItem('profileId')+".png";
    console.log("user image input parameter", user_id)
    // setLoading(true);
    // setLoadMessage("Uploading metadata Image...");
    axios.post(url.GenerateMetadata, {
        "Input": user_id
    })
        .then((res) => {
            // console.log(res.image_name);
            console.log("then inside generating metadata ")
            console.log("response", res.data);
            let code_status = res.status;
            console.log(code_status);
            if (code_status === 200) {
                console.log("human pose keypoints generated : ", url.GetMetadata + res.data+ "_keypoints.json")
            }                
            // setLoading(false);
        })
        .catch(error => {
            // setLoading(false);
            setTryonErrorPopUp(true);
            console.log("catch inside generating metadata ")
            setTimeout(() => {
                setTryonErrorPopUp(false);
            }, 390000);
        })
}
  const handleToggle=()=>{
   toggleExpanded(!imageExpanded);
  }
  function editInfoHandler() {
    //console.log("editable")
    setEditable(true);
  }

  useEffect(() => {
    const token = AuthService.getCurrentUser();
    if (!token) {
      window.location.assign('/signin');
    }
    axios.get(url.UserManagementService + url.GetProfile + sessionStorage.getItem('profileId') , { headers: authHeader() })
      .then((response) => {
        // console.log(response);
        var data = response.data;
        // console.log(response)
        setUsername(data.name);
        setUserEmail(data.parent_user.email)
        setMobile(data.parent_user.phoneNumber);
        // setImageUrl(data.imageUrl ? data.imageUrl : "");
        setDob(data.date_of_birth ? data.date_of_birth : "");
        setGender(data.gender ? data.gender : "");
        if (data.date_of_birth === "" && data.gender === "") setEditable(true);
      })
      .catch((error) => {
        // console.log("errorsssssssssss")
        // alert('userInfoNotFound');
        // console.log("hello world")
        setErrorPopUp(true);
        // window.location.assign('/');
      })
      axios.get(url.GetImage+sessionStorage.getItem('profileId')+'.png')
      .then((res)=>{
        if(!res.data.match("<Error>")){
        setImageUrl(("data:image/jpeg;base64,"+res.data));
        }
        
      })
      .catch(err=>{
        console.log(err)
      })
      // axios.get(url.GetImage+sessionStorage.getItem('profileId')+'.png')
      // .then((res)=>{
        
      //   setImageUrl(url.GetImage+sessionStorage.getItem('profileId')+'.png'+"?demo="+Math.random())
      // })
      // .catch(err=>{
      //   if(err.response.status===0){
      //     setImageUrl(url.GetImage+sessionStorage.getItem('profileId')+'.png'+"?demo="+Math.random())
      //   }
        
      // })
      
  }, []);

  // const saveImageToDB = () => {
  //   let id = localStorage.getItem('profileId');
  //   console.log(userImage);
  //   setShowPopUp(false);

  // }

  const preventDateDefault=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    e.preventDefault();
  }

  return (
    <div data-testid = "personaldetails">
    {showErrorPopUp===true?<ErrorPopup msg={t("CantSaveData")}/>:<></>}
    {showPopUp === true ? <SuccessPopUp msg={t("DataUploaded")} /> : <></>}
    {userImage === true ? <SuccessPopUp msg={t("ImageUploaded")} /> : <></>}
    {loading?<Loader loadMessage={loadMessage}/>:<></>} 
      <HeaderComponent /><br />
      <div className="personal-details-page">

        <div className="personal-details-top-section" data-testid = "commonHeader">
          <div className="left">
            <Link to="/"><ArrowBackIosIcon sx={{ color: "#000E57" }} data-testid = "Icon"/></Link>

          </div>

          <div className="right">
            PERSONAL INFORMATION
          </div>
        </div>

        <div className="personal-details-mid-section" data-testid = "personalInput">
          <p className='data-tag'>Name</p>
          <input className='input-bar' disabled={true} value={username}></input>

          {sessionStorage.getItem("isDefault") === "true" ? <>
            <p className='data-tag'>Email</p>
            <input className='input-bar' disabled={true} value={userEmail}></input>

            <p className='data-tag'>Mobile Number</p>
            <input className='input-bar' disabled={true} value={mobile}></input>
          </> : <></>}

          <p className="data-tag">Gender</p>
          <div className='gender-select-block'>
            <button className={`gender-select-box ${gender === "Male" ? "gender-selected" : ""} ${editable ? "" : "gender-disabled"}`} onClick={() => { console.log(gender); setGender("Male") }} disabled={!editable}>Male {gender === "Male" ? <span style={{ paddingLeft: "11px" }}><CheckCircleOutlineIcon sx={{ fontSize: "16px", color: editable ? "#9C1C8F" : "rgba(153, 152, 152, 0.7137254902)" }} /></span> : <></>} </button>
            <button className={`gender-select-box ${gender === "Female" ? "gender-selected" : ""} ${editable ? "" : "gender-disabled"}`} onClick={() => { console.log(gender); setGender("Female") }} disabled={!editable}>Female {gender === "Female" ? <span style={{ paddingLeft: "11px" }}><CheckCircleOutlineIcon sx={{ fontSize: "16px", color: editable ? "#9C1C8F" : "rgba(153, 152, 152, 0.7137254902)" }} /></span> : <></>}</button>
            <button className={`gender-select-box ${gender === "Other" ? "gender-selected" : ""} ${editable ? "" : "gender-disabled"}`} onClick={() => { console.log(gender); setGender("Other") }} disabled={!editable}>Other {gender === "Other" ? <span style={{ paddingLeft: "11px" }}><CheckCircleOutlineIcon sx={{ fontSize: "16px", color: editable ? "#9C1C8F" : "rgba(153, 152, 152, 0.7137254902)" }} /></span> : <></>}</button>
          </div>

          <p className='data-tag'>DOB</p>
          <input type="date" className={`input-bar ${editable ? "" : "gender-disabled"}`} min="1985-01-01" max={maxDate} onChange={handleDateChange} value={dob} disabled={!editable} onKeyDown={preventDateDefault}></input>
        </div>

        <div className="personal-details-bottom-section" data-testid = "tryonImage">

          <p className="virtual-tryon-img-title">Image for virtual try-on</p>
          {imageUrl === "" ? <div><p className="guidelineText" style={{marginTop:"10px",marginBottom:"0px"}}>Upload a full length image that can be used for the virtual try on. Please ensure that the uploaded image is clear and follows the image guidelines.</p>
          <div className='expandable-guideline-tab' onClick={handleToggle}>
                <div className='guidelines-tab-left'>Guidelines for image upload</div>
                <div className='guidelines-tab-right'>{imageExpanded?<RemoveIcon className='remove-icon'/>:<AddIcon className='remove-icon'/>}</div>
            </div></div> :<></> }
            {imageUrl === "" && imageExpanded?<ImageUploadGuidelines/>:<></>}
          {
            imageUrl === "" ? <></> : <img src={imageUrl} alt='user-img' className='user-image'/>
          }
          <input type="file" accept="image/png, image/jpeg, image/jpg" id="personal-user-image" onChange={handleImageUpload} style={{ display: 'none' }} />
          {imageSizeError ?
                    <p className="value-error">
                      <BiError className="errIcon" /> Image size should be less then 10 MB !!
                    </p>: <></>
                  }
          <button className='personal-details-button upload-image-button' onClick={handleImage}> {imageUrl === "" ? "UPLOAD IMAGE" : "EDIT IMAGE"} </button>
          
          <button className='personal-details-button edit-info-button' onClick={editable ? saveInfoHandler : editInfoHandler}>{editable ? "SAVE" : "EDIT"} INFORMATION</button>
        </div>

      </div>
    </div>
  )
}

export default PersonalDetails