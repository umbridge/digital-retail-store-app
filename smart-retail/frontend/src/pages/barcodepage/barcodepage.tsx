import React, { useEffect, useState } from "react";
import './Barcodepage.scss';
import Warning from './../../assets/images/Icons/warning.png';
import BrReader from "../../components/barcodereader/BarcodeReader";
// import { useTranslation } from "react-i18next";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const BarcodePage = () => {
  const [scan, setScan] = useState<boolean>(true);
  // const [barcode, setBarcode] = useState();
  // const pull_data = (data) => {
   
  //   setBarcode(data);
  // }
  useEffect(() => {
    setScan(scan);
    // if(!barcode){
    // setTimeout(()=>{
    //   // console.log('not detected')
    //   setScan(false)
    // },15000)}
  }, [scan])
  const handleMouseEvent = () => {
    setScan(true);
  };
  const handleScan = () => {
    setScan(false);
  }
  // const { t } = useTranslation();


  return (
    <div className="barcode-scanning-screen" data-testid="barcodepage">
      <div className="head" data-testid="barcodeHeader">
        <HeaderComponent />
      </div>
      <div className="barcode-screen" data-testid="barcodeScreen" >
        <div className="scan-product-heading" >SCAN  PRODUCT</div>
        {scan ?
          <div className="scan-section">
            {/* <div className="scan-info" >
              {t('ScanInstruction')}
            </div> */}
            <div className="barcode-reader" >             
              <BrReader handleScan={handleScan} />
            </div>
          </div> :
          <div className="scan-again">
            <img src={Warning} className="warning-icon" alt="warn-icon"></img>
            <span className="txt" >Product information not found. Please try scanning again. </span>
            <button className="scan-btn" onClick={handleMouseEvent} ><span className="btn-txt"> Scan Again</span> </button>
          </div>
        }
      </div>

    </div>
  );
}

export default BarcodePage;