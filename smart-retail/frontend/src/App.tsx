import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Signuppage from "./pages/signup/Signuppage";
import ImageUploadInstructions from "./components/ImageUploadInstructions/ImageUploadInstructions";
import Measurement from "./components/Measurement/measurement";
import VirtualTryOn from "./components/VirtualTryOn/VirtualTryOn";
import BarcodePage from "./pages/barcodepage/barcodepage";
import Signinpage from "./pages/modules/signin/Signinpage";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";
import ProductDetailPage from "./pages/ProductDetailsPage/ProductDetailPage";
import AddProfilePage from "./pages/AddProfilePage/AddProfilePage";
import ForgetPassPage from "./pages/forgetPasswordPage/ForgetPassPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/digitailvr">
        <Routes>
          <Route path="/index.html" element={<Homepage />} /> 
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signuppage/>} />
          <Route path="/image-upload-instructions" element={<ImageUploadInstructions/>}/>
          <Route path="/measurement" element={<Measurement/>}/>
          <Route path="/virtual-try-on" element={<VirtualTryOn/>}/>
          <Route path="/productDetails/:category/:id" element={<ProductDetailPage />} />
          <Route path="/scan" element={<BarcodePage />} />
          <Route path="/signin" element={<Signinpage/>} />
          <Route path="/personal-details" element={<PersonalDetails/>} />
          <Route path="/add-profile" element={<AddProfilePage/>} />
          <Route path="/forget-pass" element={<ForgetPassPage/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
