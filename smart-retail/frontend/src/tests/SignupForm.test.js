
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupForm from '../components/signup form/SignupForm';
import { Form } from "react-bootstrap";


test('returns SignupForm', () => {
  const { getByTestId } = render(<MemoryRouter><SignupForm /></MemoryRouter>);
  const submit = jest.fn()
  render(<Form  onSubmit={submit()}></Form>)
  fireEvent.click(getByTestId("signupButton"))
  expect(submit).toHaveBeenCalledTimes(1)
})

test('returns test onkeydown', () => {
    const { getByTestId } = render(<MemoryRouter><SignupForm /></MemoryRouter>);
    const onkeydown = jest.fn()
    
      fireEvent.keyDown(global.document, {
        keyCode: "CapsLock"
      });
    
    fireEvent.keyDown(getByTestId("SignupPass"),{keyCode:66})
    expect(onkeydown).toHaveBeenCalledTimes(0)
    fireEvent.keyDown(getByTestId("SignupConfirmPass"),{keyCode:66})
    expect(onkeydown).toHaveBeenCalledTimes(0)
    
  })


describe("<SignupForm />", () => {
  

  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><SignupForm/></MemoryRouter>);

    const signupFrom = getByTestId('signupform');
    const form = getByTestId('signupInputForm');
    const button = getByTestId('signupButton');
    const title = getByTestId('signupFormTitle');
    

    expect(signupFrom).toContainElement(form);
    expect(signupFrom).toContainElement(button);
    expect(signupFrom).toContainElement(title);
    
  
    
    expect(signupFrom.getElementsByClassName('input-fields').length).toBe(1);
    expect(signupFrom.getElementsByClassName('registration').length).toBe(1);
    expect(signupFrom.getElementsByClassName('btnSubmit').length).toBe(1);
    expect(signupFrom.getElementsByClassName('loginLink').length).toBe(1);


    
  });



})


