
import React, { useState, useEffect } from 'react';
import AddProfilePage from "../pages/AddProfilePage/AddProfilePage";
import { render, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import authService from "../services/auth.service"



describe("<Addprofilepage />", () => {
  test('returns logged in user', () => {
    const { result } = renderHook(() => {
      const [loggedIn, setLoggedIn] = useState(false);
      useEffect(() => {
        const token = authService.getCurrentUser();
        if (token) {
          setLoggedIn(true);
        }
      }, []);
      return loggedIn
    })
    expect(result.current).toBe(false)
  })

  
  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><AddProfilePage/></MemoryRouter>);

    const addProfile = getByTestId('addprofile-page');
    const measurement = getByTestId('addprofileMeasurements');
    const personalDetails = getByTestId('addprofilePersonalDetails');
    const header = getByTestId('addprofileHeader');
    

    expect(addProfile).toContainElement(header);
    expect(addProfile).toContainElement(measurement);
    expect(addProfile).toContainElement(personalDetails);
    
  

    // homepage elements
    
    expect(addProfile.getElementsByClassName('data-input-section').length).toBe(1);
    expect(addProfile.getElementsByClassName('expandable-guideline-tab').length).toBe(1);
    expect(addProfile.getElementsByClassName('profile-measurement').length).toBe(1);
    expect(addProfile.getElementsByClassName('image-upload-instruction').length).toBe(1);


    // sidebar elements

  });



})


