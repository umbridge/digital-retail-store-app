import React from "react";
import "./ImageUploadGuidelines.scss";
import pose from "../../assets/images/pose_img.jpg";
import { useTranslation } from "react-i18next";

function ImageUploadGuidelines() {
  
  const { t} = useTranslation();
  const instructions = t('UploadGuidelines',{ returnObjects: true });
  //console.log(instructions);

  return (
    <div data-testid="image-upload-guidelines">
      <img src={pose} className="pose-image" alt="pose-img" data-testid="guidelinesImage"/>
      {Object.entries(instructions).map((instruction, index) => {
        return (
          <div key={index} className="instructions-mid-section" data-testid="guidelines">
            <div className="mid-section-left">{index + 1}</div>
            <div className="mid-section-right"> {instruction[1]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageUploadGuidelines;
