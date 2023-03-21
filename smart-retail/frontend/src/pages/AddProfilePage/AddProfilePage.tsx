import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './AddProfilePage.scss';
import { Link, useNavigate } from 'react-router-dom';
// import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import axios from 'axios';
import posture from "../../assets/images/posture.jpg";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SizeChart from '../../components/SizeChart/SizeChart';
import { BiError } from 'react-icons/bi';
import Remove from '@mui/icons-material/Remove';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddOutlined from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageUploadGuidelines from '../../components/ImageUploadGuidelines/ImageUploadGuidelines';
import SuccessPopUp from '../../components/successPopUp/SuccessPopUp';
import { useTranslation } from 'react-i18next';
import url from "../../config/SpringboorServiceUrl.json";
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import Loader from '../../components/loader/Loader'
import authService from '../../services/auth.service';
import AddIcon from '@mui/icons-material/Add';

function AddProfilePage() {
  const { t } = useTranslation();
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [imageUrl, setImageUrl] = useState("");
  const[username,setUsername]=useState("");
  const [height, setHeight] = useState("");
  const [heightScale, setHeightScale] = useState("cm");
  const [expanded, setExpanded] = useState(false);
  const[imageExpanded,toggleExpanded]=useState(false);
  const [shirtSize, setShirtSize] = useState("");
  const [pantSize, setPantSize] = useState("");
  const [submitable, setSubmitable] = useState(false);
  const [heightErr, setHeightErr] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showErrorPopUp, setErrorPopUp] = useState(false);
  const [userImage, setUserImage] = useState<File>();
  const [user_id, setUserId] = useState();
  const [loading,setLoading]=useState(false)
  const[loadMessage,setLoadMessage]=useState("")
  const [invalidName,setInvalidName]=useState(false);
  const [imageSizeError, setImageSizeError] = useState(false)
  const [tryonErrorPopUp, setTryonErrorPopUp] = useState(false);
  const navigate = useNavigate();

  var nameRegex= new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files) {
      if(event.target.files[0].size>10000000){
        setImageSizeError(true);
      }
      else{
        setImageSizeError(false);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setUserImage(event.target.files[0]);
      }
    }

  }
  const generateMetadata = (profile_id) => {
    // let user_id = sessionStorage.getItem('profileId')+".png";
    console.log("user image input parameter", profile_id)
    // setLoading(true);
    // setLoadMessage("Uploading metadata Image...");
    axios.post(url.GenerateMetadata, {
        "Input": profile_id+".png"
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

  const handleImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.getElementById('personal-user-image')?.click();
  }

  var date = new Date();
  // var maxDate = `${(date.getFullYear() - 12).toString()}-${date.getMonth().toString().length===2?date.getMonth().toString():'0'+date.getMonth().toString()}-${date.getDay().toString().length===2?date.getDay().toString():'0'+date.getDay().toString()}`
  var maxDate = `${(date.getFullYear()-1).toString()}-${(date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():'0'+(date.getMonth()+1).toString()}-${date.getDay().toString().length===2?date.getDay().toString():'0'+date.getDay().toString()}`
  //console.log(maxDate);
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDob(e.target.value);
  }
  useEffect(() => {
    // const token = authService.getCurrentUser();
    // if (token) {
    //   setLoggedIn(true);
    // }
    // var defaultUserId=user.
    // console.log(user.userId);
    const token = authService.getCurrentUser();
    if (!token) {
      navigate('/signin');
    }
    axios
      .get(url.AuthenticationService + url.UserInfo, { headers: authHeader() })
      .then((res) => {

        axios.get(url.UserManagementService+ url.AllProfileById + res.data.userId , { headers: authHeader() })
          .then((res) => {
            // setProfiles(res.data.data);
            if(res.data.data.length>=4){
              navigate('/');
            }
            
            


          })
          .catch((error) => {
            //console.log(error.message);
          });

        
      })
  }, []);


  function saveInfoHandler() {
    if(!nameRegex.test(username)){
      setInvalidName(true);
    }
    else{
      setLoading(true);
      setLoadMessage("Creating Profile...")
      //console.log("save");
      axios.get(url.AuthenticationService + url.UserInfo, { headers: authHeader() })
        .then((res) => {
  
          var reqProfileData = {
            name: username,
            date_of_birth: dob,
            gender: gender,
            parent_user_id:res.data.userId
          };
  
          axios.post(url.UserManagementService+url.AddProfiles, reqProfileData , { headers: authHeader() })
          .then(async (response) => {
  
            // console.log('profile created success')
  
            if (response.status === 201) {
              
              setLoadMessage("Updating Measurement...");
              setUserId(response.data.data.id);
              console.log("user id: ", response.data.data.id);
              //console.log('measurement data ',response.data.data);
            await  axios.post(url.UserManagementService+url.AddMeasurement, {
              profile_id:response.data.data.id,
              height:height,
              height_param:heightScale,
              shirt_size:shirtSize,
              pant_size:pantSize
            } , { headers: authHeader() }
            )
              .then((response) => {

                //console.log(response.data.data);
                
            }).catch((error) => {
                    // console.log("hello measurement")
          })
  
  
  
          // console.log(userImage)
          if(userImage && userImage!.size<=10000000){
          setLoadMessage("Uploading Image...");
          // console.log(response)
          axios.put(url.ImageUploadApi + response.data.data.id + ".png", userImage, {
            headers: {
              'accept': 'application/json',
              'Content-Type': `image/png`,
            }
          })
            .then((imageRes) => {
              setLoading(false);
              var profile_id = response.data.data.id;
              generateMetadata(profile_id);
              setShowPopUp(true);
              setTimeout(() => {
                navigate('/')
              }, 1000);
              
            })
            .catch(error => {
              // console.log("image not uploaded");
              setLoading(false)
              setShowPopUp(true);
              setTimeout(() => {
                navigate('/')
              }, 1000);
            })
  
              }
              else{
                setLoading(false);
                // console.log("Image size greater than 10Mbs!!!..");
                setShowPopUp(true);
              setTimeout(() => {
                navigate('/')
              }, 1000);
              }
            }
            
  
          })
          .catch((error) => {
            setLoading(false);
            // console.log("err1")
            setErrorPopUp(true);
                setTimeout(() => {
                  setErrorPopUp(false);
                }, 1500);
            
          })
        })
        .catch(error => {
          setLoading(false);
          // console.log("err2")
  
          setErrorPopUp(true);
                setTimeout(() => {
                  setErrorPopUp(false);
                }, 1500);
          // alert('cannot save data')
        })
      
      
    }
  }


  
  const handleCollapsable = (data: string) => {
    var content = document.getElementById(data)!;
    //console.log(content.style.height)
    if (content.style.height === '0px') {
      // setExpanded(true)
      content.style.height = content.scrollHeight + 'px';
    }
    else {
      // setExpanded(false);
      content.style.height = 0 + 'px';
    }
  }

  

  
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      var temp = event.target.value;
      if(temp.length===0 ){
        setHeight(temp);
      }
  
      else if((temp[temp.length-1]>='0' && temp[temp.length-1]<='9') || (temp.length>1 && temp.indexOf('.')===temp.lastIndexOf('.') && temp[temp.length-1]==='.')){
        if(Number(temp)>0)
        setHeight(temp);
      }
      if (heightScale === "cm" && Number(temp) > 240) {
        setHeightErr(1);
      } else if (heightScale === "ft" && Number(temp) > 8) {
        setHeightErr(2);
      } else {
        setHeightErr(0);
      }
    
  };
  
  const handleHeightScale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var value = event.target.value;
    setHeightScale(value);
    //console.log(value + " " + height);
    if (event.target.value === "cm" && Number(height) > 240) {
      setHeightErr(1);
      //console.log(value + " " + height);
    } else if (event.target.value === "ft" && Number(height) > 8) {
      setHeightErr(2);
      //console.log(value + " " + height);
    } else {
      setHeightErr(0);
    }
  };

  const handleShirtSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShirtSize(event.target.value);
  };
  
  const handlePantSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPantSize(event.target.value);
  };

  const handleUserName=(e:React.ChangeEvent<HTMLInputElement>)=>{
    // if(nameRegex.test(e.target.value)){
      setInvalidName(false);
      setSubmitable(e.target.value!=='');
      setUsername(e.target.value);
    // }
  }
  
  const sizeArray = ["", "XS", "S", "M", "L", "XL", "XXL"];

  const handleToggle=()=>{
    toggleExpanded(!imageExpanded);
}
  
        
        const handleExpanded = () => {
          setExpanded(!expanded);
        };
        
  const preventDateDefault=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    e.preventDefault();
  }


  return (
    <>
    {showPopUp===true?<SuccessPopUp msg={t("DataUploaded")}/>:<></>}
    {showErrorPopUp===true?<ErrorPopup msg={t("CantSaveData")}/>:<></>}
    {loading?<Loader loadMessage={loadMessage}/>:<></>}
    {/* {userImage === true ? <SuccessPopUp msg={t("ImageUploaded")} /> : <></>} */}
      <div className="add-profile-page" data-testid='addprofile-page'>
        <HeaderComponent />
        <div className="product-detail-header" data-testid='addprofileHeader'>
          <div className="header-sub-title">
            <div className="sub-title-left"><Link to='/' ><ArrowBackIosIcon sx={{color:"#1C37C5"}}/></Link></div>
            <div className="sub-title">ADD PROFILE</div>
            <div className="sub-title-right"></div>
          </div>
        </div>

        <div className="data-input-section">

          <div className="profile-personal-details" data-testid='addprofilePersonalDetails'>
            <div className="profile-tag" onClick={() => { handleCollapsable('profile-input-details') }}>
              <div>Personal Details</div>
              <div><ArrowDropDownIcon sx={{ color: "#000" }} /></div>
            </div>
            <div className="personal-details-mid-section collapsable" id='profile-input-details'>
              <p className='data-tag'>Name <span style={{color:"red"}}>*</span> </p>
              <input className='input-bar' value={username} onChange={handleUserName}></input>
              {invalidName? (
                    <p className="value-error">
                      <BiError className="errIcon" /> Please enter a valid name..!!
                    </p>
                  ) :<></>}

              <p className="data-tag">Gender</p>
              <div className='gender-select-block'>
                <button className={`gender-select-box ${gender === "Male" ? "gender-selected" : ""}`} onClick={() => { console.log(gender); setGender("Male") }}>Male{gender==="Male"?<span style={{paddingLeft:"11px"}}><CheckCircleOutlineIcon sx={{fontSize:"16px",color:"#9C1C8F"}}/></span>:<></>}</button>
                <button className={`gender-select-box ${gender === "Female" ? "gender-selected" : ""}`} onClick={() => { console.log(gender); setGender("Female") }}>Female{gender==="Female"?<span style={{paddingLeft:"11px"}}><CheckCircleOutlineIcon sx={{fontSize:"16px",color:"#9C1C8F"}}/></span>:<></>}</button>
                <button className={`gender-select-box ${gender === "Other" ? "gender-selected" : ""}`} onClick={() => { console.log(gender); setGender("Other") }}>Other{gender==="Other"?<span style={{paddingLeft:"11px"}}><CheckCircleOutlineIcon sx={{fontSize:"16px",color:"#9C1C8F"}}/></span>:<></>}</button>
              </div>

              <p className='data-tag'>DOB</p>
              <input type="date" className={`input-bar`} min="1985-01-01" max={maxDate} onChange={handleDateChange} value={dob} onKeyDown={preventDateDefault}></input>


              <p className="virtual-tryon-img-title">Image for virtual try-on</p>
          
              <p style={{marginTop:"10px",marginBottom:"0px"}}>Upload a full length image that can be used for the virtual try on. Please ensure that the uploaded image is clear and follows the image guidelines.</p>
             
            <div className='expandable-guideline-tab' onClick={handleToggle}>
                <div className='guidelines-tab-left'>Guidelines for image upload</div>
                <div className='guidelines-tab-right'>{imageExpanded?<RemoveIcon className='remove-icon'/>:<AddIcon className='remove-icon'/>}</div>
            </div>
            {imageExpanded?<ImageUploadGuidelines/>:<></>}
            {
            imageUrl === "" ? <></> : <img src={imageUrl} alt='user-img' className='user-image' />
            }
          <input type="file" id="personal-user-image" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} style={{ display: 'none' }} />
          {imageSizeError ?
                    <p className="value-error">
                      <BiError className="errIcon" /> Image size should be less then 10 MB !!
                    </p>: <></>
                  }
          <button className='personal-details-button upload-image-button' onClick={handleImage}> {imageUrl === "" ? "UPLOAD IMAGE" : "CHANGE IMAGE"} </button>
            </div>
          </div>

          <div className="profile-measurement" data-testid='addprofileMeasurements'>
              <div className="profile-tag" onClick={() => { handleCollapsable('measurement-collapsable') }} style={{marginBottom:"22px"}}>
                <div>Measurements</div>
                <div><ArrowDropDownIcon sx={{ color: "#000" }} /></div>
              </div>
              <div className="input-data-section collapsable" id="measurement-collapsable">
                <div>
                  <p className="data-tag">HEIGHT</p>
                  <input
                    type="text"
                    className="height-input-bar"
                    id="height-measurement"
                    onChange={handleHeightChange}
                    value={height}
                    ></input>
                  <select
                    className="height-scale"
                    onChange={handleHeightScale}
                    style={{ paddingLeft: 8 }}
                    value={heightScale}
                    >
                    <option value={"cm"}>cm</option>
                    <option value={"ft"}>ft.</option>
                  </select>
                  {heightErr === 1 ? (
                    <p className="value-error">
                      <BiError className="errIcon" /> Height cannot be greater than 240
                      cm !
                    </p>
                  ) : heightErr === 2 ? (
                    <p className="value-error">
                      <BiError className="errIcon" /> Height cannot be greater than 8
                      ft. !
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="size-input-box">
                  <p className="data-tag">SHIRT SIZE </p>
                  <select
                    className="select-measurement-size"
                    onChange={handleShirtSize}
                    value={shirtSize}
                    >
                    {sizeArray.map((size, idx) => {
                      return (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="size-input-box">
                  <p className="data-tag">PANT SIZE</p>
                  <select
                    className="select-measurement-size"
                    onChange={handlePantSize}
                    value={pantSize}
                    >
                    {sizeArray.map((size, idx) => {
                      return (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </select>
                  <div className="image-upload-section">
                <div className="image-upload-instruction" style={{cursor:'pointer'}} onClick={handleExpanded}>
                  <div>SIZE GUIDE</div>
                  <div>{expanded ? <Remove /> : <AddOutlined sx={{fontSize:"18px"}}/>}</div>
                </div>

                {expanded ? (
                  <div>
                    {(gender==="Female" || gender==="Other" || gender==="") && <SizeChart type="women" />}
                    {(gender==="Male" || gender==="Other" || gender==="") && <SizeChart type="men" />}
                    <img src={posture} className="posture-image" alt='posture-img'/>
                  </div>
                ) : (
                  <></>
                  )}
                </div>
              </div>
                {/* <div className="image-upload-button-section">
                    <p className='image-upload-label'>IMAGE FOR VIRTUAL TRY ON</p>
                    <Link to="image-upload-instructions" className='image-upload-button'></Link>
                    <button className='image-upload-button' onClick={handleUploadImage}>UPLOAD IMAGE</button>
                  </div> */}
              </div>
            </div>

            <div style={{marginBottom:"140px"}}></div>

        </div>
        <div className="profile-bottom-section">
          <button className='profile-edit-info' disabled={!submitable || heightErr!==0} style={!submitable || heightErr!==0?{backgroundColor:'#808080'}:{}} onClick={saveInfoHandler}>{"SAVE"} PROFILE</button>
        </div>
      </div>

    </>
  )
}

export default AddProfilePage


// useEffect(() => {
//   const token = AuthService.getCurrentUser();
//   if (!token) {
//     window.location.assign('/signin');
//   }
//   axios.get('http://localhost:8081/customer/profile', { headers: authHeader() })
//     .then((response) => {
//       var data = response.data;
//       setUsername(data.name);
//       setUserEmail(data.email)
//       setMobile(data.phoneNumber);
//       setImageUrl(data.imageUrl?data.imageUrl:"");
//       setDob(data.date_of_birth ? data.date_of_birth : "");
//       setGender(data.gender ? data.gender : "");
//       if (data.ddate_of_birthob === "" && data.gender === "") setEditable(true);
//     })
//     .catch((error) => {
//       alert('userInfoNotFound');
//       window.location.assign('/');
//     })
// }, []);

 // useEffect(() => {
  //   const token = AuthService.getCurrentUser();
  //   if (!token) {
  //     window.location.assign("/signin");
  //   }
  
  //   console.log("hello world");
  //   axios
  //     .get("http://localhost:8081/customer/profile", { headers: authHeader() })
  //     .then((response) => {
  //       console.log(
    //         "http://localhost:8080/api/getMeasurements/" + response.data.userId
    //       );
    //       axios
    //         .get(
      //           "http://localhost:8080/api/getMeasurements/" + response.data.userId
      //         )
      //         .then((res) => {
        //           if (res.data.status === 200) {
          //             console.log("inside api response");
          //             setEditable(false);
          //             setHeight(res.data.data.height.toString());
          //             setHeightScale(res.data.data.height_param);
          //             setShirtSize(res.data.data.shirt_size);
          //             setPantSize(res.data.data.pant_size);
          //             setResult(res.data);
          
          //             console.log(editable);
          //             console.log(height);
          //           } else {
            //             setEditable(true);
            //           }
  //         })
  //         .catch((err) => {
  //           setEditable(true);
  //         });
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //       window.location.assign("/");
  //     });
  // }, []);