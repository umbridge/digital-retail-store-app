
import React, { useState, useEffect } from 'react';
import Signinpage from "../pages/modules/signin/Signinpage";
import { render, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import authService from "../services/auth.service"






describe("<Signinpage />", () => {
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

  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><Signinpage/></MemoryRouter>);

    const signup = getByTestId('signin-page');
    const headerSignin = getByTestId('headerSignin');
    const signinForm = getByTestId('signinForm');
    const logo = getByTestId('logoSignin');
    

    expect(signup).toContainElement(headerSignin);
    expect(signup).toContainElement(signinForm);
    expect(signup).toContainElement(logo);
  

    // homepage elements
    
    expect(signup.getElementsByClassName('logoImg').length).toBe(1);
    expect(signup.getElementsByClassName('logobar').length).toBe(1);



    // sidebar elements

  });



})


