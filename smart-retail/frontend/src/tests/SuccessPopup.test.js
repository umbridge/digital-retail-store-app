
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import SuccessPopUp from '../components/successPopUp/SuccessPopUp';

describe("<Loader />", () => {
 

  test('should render sidebar', async () => {
    const { getByTestId } = render(<MemoryRouter><SuccessPopUp/></MemoryRouter>);
    const popup = getByTestId('SuccessPopup');
    const icon = getByTestId('Icon');
    const msg = getByTestId('Desc');

    expect(popup).toContainElement(icon);
    expect(popup).toContainElement(msg);
   
    expect(popup.getElementsByClassName('titlePop').length).toBe(1);
    expect(popup.getElementsByClassName('descPop').length).toBe(1);

  });

  test('returns function test', () => {
    const { getByTestId } = render(<MemoryRouter><SuccessPopUp /></MemoryRouter>);
    const handleClose = jest.fn()
   
    render(<Dialog
      
        onClose={handleClose}
      ></Dialog>)
    fireEvent.click(getByTestId("SuccessPopup"))
    expect(handleClose).toHaveBeenCalledTimes(0)
  })




})


