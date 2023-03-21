import React from 'react';
import Homepage from "../pages/homepage/Homepage";
import Signuppage from "../pages/signup/Signuppage";
import Measurement from "../components/Measurement/measurement";
import VirtualTryOn from "../components/VirtualTryOn/VirtualTryOn";
import ProductDetailPage from "../pages/ProductDetailsPage/ProductDetailPage";
import Signinpage from "../pages/modules/signin/Signinpage";
import PersonalDetails from "../pages/PersonalDetails/PersonalDetails";
import AddProfilePage from "../pages/AddProfilePage/AddProfilePage";
import ForgetPassPage from "../pages/forgetPasswordPage/ForgetPassPage";
import ImageUploadInstructions from "../components/ImageUploadInstructions/ImageUploadInstructions";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe("<App />", () => {


  // AddProfilePage Page
  it('should show AddProfilePage component for /add-profile router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/add-profile']}"><AddProfilePage /></MemoryRouter>);
    expect(container.getElementsByClassName('add-profile-page').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  // PersonalDetails Page
  it('should show PersonalDetails component for /personal-details router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/personal-details']}"><PersonalDetails /></MemoryRouter>);
    expect(container.getElementsByClassName('personal-details-page').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  // ProductDetail Page
  it('should show ProductDetailPage component for /productDetails/:category/:id router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/productDetails/:category/:id']}"><ProductDetailPage /></MemoryRouter>);
    expect(container.getElementsByClassName('product-details-page').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  // VirtualTryOn Page
  it('should show VirtualTryOn component for /virtual-try-on router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/virtual-try-on']}"><VirtualTryOn /></MemoryRouter>);
    expect(container.getElementsByClassName('virtual-tryon-page').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  // Measurement Page
  it('should show measurement component for /measurement router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/measurement']}"><Measurement /></MemoryRouter>);
    expect(container.getElementsByClassName('image-upload').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  // Home Page
  it('should show Home component for / router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/']}"><Homepage /></MemoryRouter>);
    expect(container.getElementsByClassName('logobar').length).toBe(1);
    expect(container.getElementsByClassName('logoImg').length).toBe(1);
    expect(container.getElementsByClassName('shoppingCart').length).toBe(1);
    expect(container.getElementsByClassName('homepage').length).toBe(1);

    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(2)
  })

  //Image Upload Page
  it('should show ImageUploadInstructions component for /image-upload-instructions router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/image-upload-instructions']}"><ImageUploadInstructions /></MemoryRouter>);
    expect(container.getElementsByClassName('image-upload-instructions').length).toBe(1);
  })

  //Signup Page
  it('should show SignUp component for /signup router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/signup']}"><Signuppage/></MemoryRouter>);
    expect(container.firstChild).toHaveClass('signuppage')
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(1)
  })

  //Barcode Page
  // it('should show Barcode component for /scan router (using memory router)', () => {
  //   const { container } = render(<MemoryRouter initialentries="{['/scan']}"><BarcodePage/></MemoryRouter>);
  //   expect(container.getElementsByClassName('barcode-scanning-screen').length).toBe(1);
  //   const logoCounts = screen.getAllByAltText(/logo/);
  //   expect(logoCounts).toHaveLength(2)
  // })

  
  //Signinpage 
   it('should show Signinpage component for /signin router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/signin']}"><Signinpage/></MemoryRouter>);
    expect(container.getElementsByClassName('logobar').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(1)
  })

  // ForgetPassPage Page
  it('should show ForgetPassPage component for /forget-pass router (using memory router)', () => {
    const { container } = render(<MemoryRouter initialentries="{['/forget-pass']}"><ForgetPassPage /></MemoryRouter>);
    expect(container.getElementsByClassName('forgetPassPage').length).toBe(1);
    const logoCounts = screen.getAllByAltText(/logo/);
    expect(logoCounts).toHaveLength(1)
  })
})

