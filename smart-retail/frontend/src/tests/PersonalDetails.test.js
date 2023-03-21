
import React, { useState, useEffect } from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import authService from "../services/auth.service"
import { FaBars } from "react-icons/fa";
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';


describe("<HomePage />", () => {
  test('returns registered user', () => {
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

  
  test('should render sidebar', async () => {
    const { getByTestId } = render(<MemoryRouter><PersonalDetails/></MemoryRouter>);

    const personaldetails = getByTestId('personaldetails');
  
    const Icon = getByTestId('Icon');
    const personalInput = getByTestId('personalInput');
    const tryonImage = getByTestId('tryonImage')


    expect(personaldetails).toContainElement(personalInput);
    expect(personaldetails).toContainElement(Icon);
    expect(personaldetails).toContainElement(tryonImage);

    // homepage elements
    expect(personaldetails.getElementsByClassName('personal-details-page').length).toBe(1);
    expect(personaldetails.getElementsByClassName('personal-details-top-section').length).toBe(1);
    expect(personaldetails.getElementsByClassName('left').length).toBe(1);
    expect(personaldetails.getElementsByClassName('right').length).toBe(1);


    // sidebar elements

  });


  test('returns navbar', () => {
    const { getByTestId } = render(<MemoryRouter><PersonalDetails /></MemoryRouter>);
    const showSidebar = jest.fn()
    render(<FaBars onClick={showSidebar} />)
    fireEvent.click(getByTestId("show-side-bar"))
    expect(showSidebar).toHaveBeenCalledTimes(0)
  })


})


