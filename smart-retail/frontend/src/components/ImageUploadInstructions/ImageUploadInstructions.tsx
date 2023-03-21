import './ImageUploadInstructions.scss'
import React, { useState } from 'react'
import './ImageUploadInstructions.scss'
import ImageUploadGuidelines from '../ImageUploadGuidelines/ImageUploadGuidelines';


function ImageUploadInstructions() {

    const handleClick = () => {
        var elem: HTMLElement = document.getElementById("upload")!;
        elem.click();
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        //console.log(event.target.files![0]);
        //console.log(URL.createObjectURL(event.target.files![0]))

        if (event.target.files) {
            //console.log(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }
    }
    const submitImage = () => {
        //console.log("Image upload logic");
        window.location.assign('/personal-details');
    }

    const [imageUrl, setImageUrl] = useState("")



    return (
        <div className="image-upload-instructions" data-testid="image-upload-instructions">
            <div className='instructions-top-section' data-testid="instructions-top-section">
                <h3>HOW TO UPLOAD AN IMAGE FOR VIRTUAL TRY-ON</h3>
            </div>

            {imageUrl === "" ? <ImageUploadGuidelines /> : <img src={imageUrl} className="user-image" alt='user-img'/>}



            <div className='instructions-bottom-section' data-testid="instructions-bottom-section">
                <button className='instructions-proceed-button' data-testid="instructions-proceed-button" onClick={handleClick}>
                    {imageUrl === "" ? 'PROCEED' : 'CHANGE IMAGE'}
                </button>
            </div>
            {imageUrl === "" ? <></> : <button className='upload-image-button' data-testid="upload-image-button" onClick={submitImage}>SUBMIT IMAGE</button>}

            <input type="file" id='upload' accept="image/png, image/jpeg" onChange={handleOnChange}></input>
        </div>

    )

}



export default ImageUploadInstructions