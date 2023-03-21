import './BarcodeReader.scss';
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import url from "../../config/SpringboorServiceUrl.json";
import { useTranslation } from "react-i18next";
import axios from "axios";
import MeasurementPopup from '../measurementPopup/MeasurementPopup';
import authHeader from '../../services/auth-header';

const BarcodeReader = ({handleScan}) => {
  let sizeArr=['XS','S','M','L','XL','XXL']
  
  const [scanning, setScanning] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [profileM, setProfileM] = useState(String);
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();


  useEffect(() => {
    startScanner();
  }, []);

  useEffect(() => {
    let varID=barcode?.substring(0, barcode.length - 1);
    if(varID){
    axios
      .get(url.ProductService+url.VariantById+varID)
      .then(async (res) => {
        
        let id=res.data.data.product_id.id;
        
        let prod_Category= await axios
          .get(url.ProductService+url.ProductDetails+id+url.Category)
          .then((result) => {
            return result.data;
          })
          .catch((err) => {
            console.log("prod not found");
            handleScan();
          });
        
        if (barcode !== "") {
          
          axios
          .get(
            url.UserManagementService +url.GetMeasurement + sessionStorage.getItem("profileId") , { headers: authHeader() }
          )
          .then((response) => {
            
            setProfileM(response.data.data.shirt_size);
            if(sizeArr[Number(barcode?.substring(barcode.length-1, barcode.length))-1]===(response.data.data.shirt_size)|| response.data.data.shirt_size===''){
              navigate(`/productDetails/${prod_Category}/${barcode}`, {
                state: { barcode: barcode, prodCategory: prod_Category },
              });
            }
            else{
              setShowPopup(true);
            }
             

          })
          .catch((err) => {
            navigate(`/productDetails/${prod_Category}/${barcode}`, {
              state: { barcode: barcode, prodCategory: prod_Category },
            });
            
            
          });
          
          
        }
      })
      .catch((error) => {
        handleScan();
      });
    }
  }, [barcode]);

  const _onDetected = (res) => {    
    setScanning(false);
    Quagga.stop();
    if (scanning === false) {
      stopScanner();
    }
    setBarcode(res.codeResult.code);
    // props.func(res.codeResult.code)
  };

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            facingMode: 'environment' // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: false,
          showFrequency: false,
          drawScanline: false,
          showPattern: false
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
            'i2of5_reader',
            '2of5_reader',
            'code_93_reader'
          ]
        }
      },
      err => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(_onDetected);
  };
  const stopScanner = () =>{
    Quagga.offProcessed();
      Quagga.offDetected();
      Quagga.stop();
  }


  return (
    <>{showPopup===true?<MeasurementPopup VarId={Number(barcode?.substring(0, barcode.length-1))} ProfileM={profileM} ScannedM={Number(barcode?.substring(barcode.length-1, barcode.length))} />:<></>}
      {scanning && <React.Fragment>
        <div id="scanner-container" data-testid="barcodereader">
          <div className="scan-info" >
            <div className='scan-text' ><p>{t('ScanInstruction')}</p>
            {/* <div class="scanArea"></div> */}
            </div>
            {/* <div className='border-box-left'></div> */}
            {/* <div className='border-box-right'></div>             */}
          </div>
          {/* <div className='border-box-bottom'></div>   */}
        </div>
      </React.Fragment>
      }
    </>
  )
}

export default BarcodeReader;


