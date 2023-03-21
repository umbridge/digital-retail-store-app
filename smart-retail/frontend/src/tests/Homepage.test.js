
import React, { useState, useEffect } from 'react';
import Homepage from "../pages/homepage/Homepage";
import { render,  fireEvent, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import authService from "../services/auth.service"
import { FaBars } from "react-icons/fa";


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
    const { getByTestId } = render(<MemoryRouter><Homepage/></MemoryRouter>);

    const homepage = getByTestId('homepage');
    const posterCarousel = getByTestId('posterCarousel');
    const scan_button = getByTestId('scan-button');
    const sidebar = getByTestId('sidebar');
    const nav_bar = getByTestId('nav-bar');

    expect(homepage).toContainElement(sidebar);
    expect(homepage).toContainElement(posterCarousel);
    expect(homepage).toContainElement(scan_button);
    expect(sidebar).toContainElement(nav_bar);

    // homepage elements
    expect(homepage.getElementsByClassName('logobar').length).toBe(1);
    expect(homepage.getElementsByClassName('logoImg').length).toBe(1);
    expect(homepage.getElementsByClassName('shoppingCart').length).toBe(1);
    expect(homepage.getElementsByClassName('homepage').length).toBe(1);


    // sidebar elements

  });


  test('returns navbar', () => {
    const { getByTestId } = render(<MemoryRouter><Homepage /></MemoryRouter>);
    const showSidebar = jest.fn()
    render(<FaBars onClick={showSidebar} />)
    fireEvent.click(getByTestId("show-side-bar"))
    expect(showSidebar).toHaveBeenCalledTimes(0)
  })
})


