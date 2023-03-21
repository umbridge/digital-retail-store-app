
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormControl, IconButton, OutlinedInput} from '@mui/material';
import { Form} from "react-bootstrap";
import ForgetPassPage from '../pages/forgetPasswordPage/ForgetPassPage';

describe("<ForgetPassPage />", () => {
  test('should render forget password screen', async () => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const forgetPasswordPage = getByTestId('forgetpasswordpage');
    const forgetpasswordcomponent = getByTestId('forgetpasswordcomponent');
    const forgetpassform = getByTestId('forgetpassform');

    
    
    expect(forgetPasswordPage).toContainElement(forgetpasswordcomponent);
    expect(forgetpasswordcomponent).toContainElement(forgetpassform);
   

    // // homepage elements
    expect(forgetPasswordPage.getElementsByClassName('forgetPassPage').length).toBe(1);
    expect(forgetpasswordcomponent.getElementsByClassName('forgetPassDiv').length).toBe(1);
    expect(forgetpasswordcomponent.getElementsByClassName('col-lg-12').length).toBe(4);
    expect(forgetpasswordcomponent.getElementsByClassName('mb-4 mt-2').length).toBe(1);
   

    
  });
  test("check display of Password instructions on input focus", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const PassInstruction = jest.fn()
    render(<FormControl onClick={PassInstruction} />)
    fireEvent.click(getByTestId("focus-input"))
    expect(PassInstruction).toHaveBeenCalledTimes(0)
  })

  test("render show/hide password icon", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const togglePass = jest.fn()
    render(<IconButton onClick={togglePass} />)
    fireEvent.click(getByTestId("show-hide-pass"))
    expect(togglePass).toHaveBeenCalledTimes(0)
  })

  test("render submission of form", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const submit = jest.fn()
    render(<Form onClick={submit} />)
    fireEvent.click(getByTestId("forgetpassform"))
    expect(submit).toHaveBeenCalledTimes(0)
  })
  test("render show/hide the password icon", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const toggleConfirmPass = jest.fn()
    render(<IconButton onClick={toggleConfirmPass} />)
    fireEvent.click(getByTestId("show-hide-pass"))
    expect(toggleConfirmPass).toHaveBeenCalledTimes(0)
  })

  test("render show/hide confirm password icon", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const handle = jest.fn()
    render(<OutlinedInput onChange={handle} />)
    fireEvent.change(getByTestId("show-hide-pass"))
    expect(handle).toHaveBeenCalledTimes(0)
  })

  test("render show/hide the confirm password icon", async() => {
    const { getByTestId } = render(<MemoryRouter><ForgetPassPage /></MemoryRouter>);
    const onkeydown = jest.fn()
    render(<OutlinedInput onChange={onkeydown} />)
    fireEvent.keyDown(getByTestId("show-hide-pass"))
    expect(onkeydown).toHaveBeenCalledTimes(0)
  })


})


