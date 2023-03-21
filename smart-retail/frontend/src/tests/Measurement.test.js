
import React, { useState, useEffect } from 'react';

import { render, fireEvent, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import authService from "../services/auth.service"

import Measurement from '../components/Measurement/measurement';


test('returns function tests', () => {
  const { getByTestId } = render(<MemoryRouter><Measurement /></MemoryRouter>);
  const handleExpanded = jest.fn()
  render(<div className="image-upload-instruction" onClick={handleExpanded}></div>)
  fireEvent.click(getByTestId("image-upload-instruction"))
  expect(handleExpanded).toHaveBeenCalledTimes(0)

  const handleEditMeasurement = jest.fn()
  render(<button className="edit-measurement-button" data-testid="edit-measurement-button"  onClick={handleEditMeasurement}>
    EDIT MEASUREMENT </button>)
  fireEvent.click(getByTestId("edit-measurement-button"))
  expect(handleEditMeasurement).toHaveBeenCalledTimes(1)

  const handleShirtSize = jest.fn()
  render(<select className="select-measurement"  onChange={handleShirtSize}  
    data-testid="Shirt"></select>)
  fireEvent.select(getByTestId("measurementShirt"))
  expect(handleShirtSize).toHaveBeenCalledTimes(0)
})

describe("<Measurement />", () => {
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
    const { getByTestId } = render(<MemoryRouter><Measurement/></MemoryRouter>);

    const measurementPage = getByTestId('measurementPage');
    const measurementInput = getByTestId('measurementInput');
    const measurementShirt = getByTestId('measurementShirt');
    const measurementPant = getByTestId('measurementPant');
    

    expect(measurementPage).toContainElement(measurementInput);
    expect(measurementPage).toContainElement(measurementPant);
    expect(measurementPage).toContainElement(measurementShirt);
   

    // homepage elements
    expect(measurementPage.getElementsByClassName('input-data-section').length).toBe(1);
    expect(measurementPage.getElementsByClassName('height-input-bar').length).toBe(1);
    expect(measurementPage.getElementsByClassName('select-measurement').length).toBe(2);
    expect(measurementPage.getElementsByClassName('image-upload-section').length).toBe(1);


    // sidebar elements

  });



})


