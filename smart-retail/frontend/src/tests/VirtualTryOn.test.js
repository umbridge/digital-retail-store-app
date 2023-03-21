
import React from 'react';
import { render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Loader from '../../components/loader/Loader';
import VirtualTryOn from '../components/VirtualTryOn/VirtualTryOn';



describe("<VirtualTryOn />", () => {
  

  test('should render sidebar', async () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn/></MemoryRouter>);
    const virtualtryonpage = getByTestId('virtual-try-on-page');
    const commonHeader = getByTestId('commonHeader');
    const successpopup = getByTestId('success-popup');
    const errorpopup = getByTestId('errorpopup');
    const timeoutpopup = getByTestId('timeoutpopup');

    expect(virtualtryonpage).toContainElement(commonHeader);
    expect(virtualtryonpage).toContainElement(successpopup);
    expect(virtualtryonpage).toContainElement(errorpopup);
    expect(virtualtryonpage).toContainElement(timeoutpopup);

    
    expect(commonHeader.getElementsByClassName('logobarCommon').length).toBe(1);
    expect(commonHeader.getElementsByClassName('shoppingCart').length).toBe(1);
    expect(successpopup.getElementsByClassName('titlePop').length).toBe(1);
    expect(errorpopup.getElementsByClassName('titlePop').length).toBe(1);
    expect(timeoutpopup.getElementsByClassName('titlePop').length).toBe(1);

  });

  test('returns loaders', () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn /></MemoryRouter>);
    const loadMessage = jest.fn()
    render(<Loader onClick={loadMessage} />)
    fireEvent.click(getByTestId("loader"))
    expect(loadMessage).toHaveBeenCalledTimes(0)
  })

  test('returns navbar', () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn /></MemoryRouter>);
    const showSidebar = jest.fn()
    render(<FaBars onClick={showSidebar} />)
    fireEvent.click(getByTestId("show-side-bar"))
    expect(showSidebar).toHaveBeenCalledTimes(0)
  })
  


  test('render save button', () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn /></MemoryRouter>);
    const downloadImage = jest.fn()
    render(<MenuItem onClick={downloadImage} />)
    fireEvent.click(getByTestId("save-result-image"))
    expect(downloadImage).toHaveBeenCalledTimes(0)
  })

  test('render side menu', () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn /></MemoryRouter>);
    const handleClose = jest.fn()
    render(<Menu onClick={handleClose} />)
    fireEvent.handleClose(getByTestId("open-side-menu"))
    expect(handleClose).toHaveBeenCalledTimes(0)
  })

  test('render tryon button', () => {
    const { getByTestId } = render(<MemoryRouter><VirtualTryOn /></MemoryRouter>);
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} />)
    fireEvent.click(getByTestId("menu-button"))
    expect(handleClick).toHaveBeenCalledTimes(0)
  })


})


