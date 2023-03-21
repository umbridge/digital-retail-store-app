
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import ErrorPopup from '../components/ErrorPopup/ErrorPopup';

describe("<Errorpopup />", () => {
 

  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><ErrorPopup/></MemoryRouter>);
    const popup = getByTestId('errorpopup');
    const icon = getByTestId('errorIcon');
    const desc = getByTestId('errorDesc');

    expect(popup).toContainElement(icon);
    expect(popup).toContainElement(desc);
   
    expect(popup.getElementsByClassName('titlePop').length).toBe(1);
    expect(popup.getElementsByClassName('descPop').length).toBe(1);

  });

  test('returns handle function test', () => {
    const { getByTestId } = render(<MemoryRouter><ErrorPopup /></MemoryRouter>);
    const handleClose = jest.fn()
   
    render(<Dialog
      
        onClose={handleClose}
      ></Dialog>)
    fireEvent.click(getByTestId("errorpopup"))
    expect(handleClose).toHaveBeenCalledTimes(0)
  })




})


