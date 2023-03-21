
import React  from 'react';
import Signuppage from "../pages/signup/Signuppage";
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';




describe("<Signuppage />", () => {  
  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><Signuppage/></MemoryRouter>);

    const signup = getByTestId('signup-page');
    const headerSignup = getByTestId('headerSignup');
    const signupform = getByTestId('signupform');
    const logo = getByTestId('logoSignup');
    
    expect(signup).toContainElement(headerSignup);
    expect(signup).toContainElement(signupform);
    expect(signup).toContainElement(logo);
  

    // homepage elements
    
    expect(signup.getElementsByClassName('logoImg').length).toBe(1);
    expect(signup.getElementsByClassName('header-signup').length).toBe(1);


    // sidebar elements

  });



})


