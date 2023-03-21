import React, { useEffect, useState } from "react";
import "./measurement.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SizeChart from "../SizeChart/SizeChart";
import posture from "../../assets/images/posture.jpg";
import AuthService from "../../services/auth.service";
// import authHeader from "../../services/auth-header";
import { BiError } from "react-icons/bi";
import RemoveIcon from "@mui/icons-material/Remove";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { useTranslation } from "react-i18next";
import SuccessPopUp from "../successPopUp/SuccessPopUp";
import url from "../../config/SpringboorServiceUrl.json";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Loader from "../loader/Loader";
import authHeader from "../../services/auth-header";
import AddIcon from '@mui/icons-material/Add';

function Measurement() {
  // const [error, setError] = useState("0")
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [height, setHeight] = useState<string>();
  const [heightScale, setHeightScale] = useState("cm");
  const [expanded, setExpanded] = useState(false);
  const [shirtSize, setShirtSize] = useState("");
  const [pantSize, setPantSize] = useState("");
  // const [result, setResult] = useState({});
  const [editable, setEditable] = useState(true);
  const [heightErr, setHeightErr] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showErrorPopUp, setErrorPopUp] = useState(false);
  const [callUpdate,setCallUpdate]=useState(false);
  const [loading, setLoading] = useState(false)
  const [loadMessage, setLoadMessage] = useState("")
  const [gender, setGender] = useState("")

  useEffect(() => {
    const token = AuthService.getCurrentUser();
    if (!token) {
      window.location.assign("/signin");
    }

    //console.log(url.AuthenticationService+"/api/getMeasurements/" + localStorage.getItem("profileId"));
    // console.log("1")
        axios
          .get(
            url.UserManagementService +url.GetMeasurement + sessionStorage.getItem("profileId") , { headers: authHeader() }
          )
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              // console.log(res.data.data);
              setEditable(false);
              setHeight(res.data.data.height===0?"":res.data.data.height?.toFixed(1).toString());
              setHeightScale(res.data.data.height_param);
              setShirtSize(res.data.data.shirt_size);
              setPantSize(res.data.data.pant_size);
              // setResult(res.data);

              setCallUpdate(true);

            } else {
              setEditable(true);
            }
          })
          .catch((err) => {
            // console.log(err)
            setEditable(err);
          });
          axios
            .get(
              url.UserManagementService +
                url.GetProfile +
                sessionStorage.getItem("profileId") , { headers: authHeader() }
            )
            .then((response) => {
              // console.log(response);
              var data = response.data;
              // console.log(response)
              
              setGender(data.gender ? data.gender : "");
              
            })
            .catch((error) => {
              console.log(error);
              
            });
  }, []);

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    var temp = event.target.value;
    // console.log(temp[temp.length-1]);

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
    // console.log(event.target.value);
    // console.log(value+" "+height);
    if (event.target.value === "cm" && Number(height) > 240) {
      setHeightErr(1);
      //console.log(value+" "+height);
    } else if (event.target.value === "ft" && Number(height) > 8) {
      setHeightErr(2);
      //console.log(value+" "+height);
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

  const handleEditMeasurement = () => {
    setEditable(true);
  };

  const sizeArray = ["", "XS", "S", "M", "L", "XL", "XXL"];

  const handleSaveMeasurement = () => {
    setLoading(true);
    setLoadMessage("Saving...")
    if (heightErr === 0) {
      
          var reqData = {
            profile_id: sessionStorage.getItem('profileId'),
            height: height,
            height_param: heightScale,
            shirt_size: shirtSize,
            pant_size: pantSize,
          };

          // console.log(reqData);

          (callUpdate?axios.put(url.UserManagementService+url.UpdateMeasurement+sessionStorage.getItem('profileId'),reqData , { headers: authHeader() })  :  axios.post(url.UserManagementService+url.AddMeasurement, reqData , { headers: authHeader() }))
            .then((res) => {
              setLoading(true);

              if (res.status === 201 || res.status===200) {
                setEditable(false);
                setShowPopUp(true);
                setTimeout(() => {
                  navigate("/");
                }, 1000);
                // alert("Data saved Successfully!!");
              } else {
                // alert("Server unavailable");
                setErrorPopUp(true)
              }
            })
            .catch((err) => {
            setLoading(false);

              // alert(err.message);
              
              setErrorPopUp(true);
              setTimeout(() => {
                setErrorPopUp(false);
              }, 1500);
              // window.location.assign('/')
            });
        }

        else{
          setLoading(false);
        }
    
  }

  // const handleUploadImage = () => {
  //     window.location.assign("/image-upload-instructions");
  // }

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>{showPopUp===true?<SuccessPopUp msg={t("DataSaved")}/>:<></>}
    {showErrorPopUp===true?<ErrorPopup msg={t("CantSaveData")}/>:<></>}
    {loading ? <Loader loadMessage={loadMessage} /> : <></>}
    <HeaderComponent/><br/>
    <div className="image-upload" data-testid="measurementPage">
      
      <div className="image-upload-top-section">
        <Link to="/">
          {" "}
          <ArrowBackIosIcon sx={{ color: "#000E57" }} />
        </Link>
        <button className="back-button"> </button>
        <h3 className="top-section-content">MEASUREMENTS</h3>
      </div>

      <div className="input-data-section" data-testid="measurementInput">
        <div>
          <p className="data-tag">HEIGHT</p>
          <input
            type="text"
            className="height-input-bar"
            id="height-measurement"
            disabled={!editable}
            onChange={handleHeightChange}
            value={height}
            data-testid="measurementHeight"
          ></input>
          <select
            className="height-scale"
            onChange={handleHeightScale}
            style={{ paddingLeft: 8 }}
            disabled={!editable}
            value={heightScale}
          >
            <option value={"cm"}>cm</option>
            <option value={"ft"}>ft.</option>
          </select>
          {heightErr === 1 ? (
            <p className="value-error">
              <BiError className="errIcon" /> The maximum limit for height is 240
              cm !
            </p>
          ) : heightErr === 2 ? (
            <p className="value-error">
              <BiError className="errIcon" /> The maximum limit for height is 8
              ft. !
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="size-input-box">
          <p className="data-tag">SHIRT SIZE </p>
          <select
            className="select-measurement"
            onChange={handleShirtSize}
            disabled={!editable}
            value={shirtSize}
            data-testid="measurementShirt"
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
            className="select-measurement"
            onChange={handlePantSize}
            disabled={!editable}
            value={pantSize}
            data-testid="measurementPant"
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
      </div>

      <div className="image-upload-section">
        <div className="image-upload-instruction" data-testid="image-upload-instruction" onClick={handleExpanded}>
          <div>SIZE GUIDE</div>
          <div>{expanded ? <RemoveIcon className='remove-icon' /> : <AddIcon className='remove-icon'/>}</div>
        </div>

        {expanded ? (
          <div>
            {(gender==="Female" || gender==="Other" || gender==="") && <SizeChart type="women" />}
            {(gender==="Male" || gender==="Other" || gender==="") && <SizeChart type="men" />}
            <img src={posture} className="posture-image" alt="posture-img"/>
          </div>
        ) : (
          <></>
        )}

        {/* <div className="image-upload-button-section">
                    <p className='image-upload-label'>IMAGE FOR VIRTUAL TRY ON</p>
                    <Link to="image-upload-instructions" className='image-upload-button'></Link>
                    <button className='image-upload-button' onClick={handleUploadImage}>UPLOAD IMAGE</button>
                </div> */}
      </div>

      <div
        className="bottom-section"
        style={{ marginTop: expanded ? "20px" : "200px" }}
      >
        {editable ? (
          <button
            className={`save-measurement-button ${
              height?.toString() === "" || shirtSize === "" || pantSize === "" || heightErr!==0
                ? "disabled-button"
                : ""
            }`}
            onClick={handleSaveMeasurement}
            disabled={height?.toString() === "" || shirtSize === "" || pantSize === "" || heightErr!==0}
          >
            SAVE MEASUREMENT
          </button>
        ) : (
          <button
            className="edit-measurement-button"
            data-testid="edit-measurement-button"
            onClick={handleEditMeasurement}
          >
            EDIT MEASUREMENT
          </button>
        )}
      </div>
    </div>
    </>
  );
}
export default Measurement;
