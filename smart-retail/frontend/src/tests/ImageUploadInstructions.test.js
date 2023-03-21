
import React from 'react';

import { render,  fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ImageUploadInstructions from '../components/ImageUploadInstructions/ImageUploadInstructions';
import ImageUploadGuidelines from '../components/ImageUploadGuidelines/ImageUploadGuidelines';

test('returns tests', () => {
  const { getByTestId } = render(<MemoryRouter><ImageUploadInstructions /></MemoryRouter>);
  const submitImage = jest.fn()
  render(<button className='upload-image-button' data-testid="upload-image-button" onClick={submitImage}>SUBMIT IMAGE</button>)
  fireEvent.click(getByTestId("upload-image-button"))
  expect(submitImage).toHaveBeenCalledTimes(1)
})

describe("<ImageUploadInstruction />", () => {
  
  test('should render components', async () => {
    const { getByTestId } = render(<MemoryRouter><ImageUploadInstructions/></MemoryRouter>);

    const imageUploadInstructions = getByTestId('image-upload-instructions');
    const top = getByTestId('instructions-top-section');
    const bottom = getByTestId('instructions-bottom-section');
    const button = getByTestId('instructions-proceed-button');

    expect(imageUploadInstructions).toContainElement(top);
    expect(imageUploadInstructions).toContainElement(bottom);
    expect(imageUploadInstructions).toContainElement(button);
    

    expect(imageUploadInstructions.getElementsByClassName('instructions-top-section').length).toBe(1);
    expect(imageUploadInstructions.getElementsByClassName('instructions-proceed-button').length).toBe(1);
    expect(imageUploadInstructions.getElementsByClassName('instructions-bottom-section').length).toBe(1);



  });
  
  

})

describe("<ImageUploadGuidelines />", () => {
  
  test('should render guidelines component', async () => {
    const { getByTestId } = render(<MemoryRouter><ImageUploadGuidelines/></MemoryRouter>);

    const imageUploadGuidelines = getByTestId('image-upload-guidelines');
    const image = getByTestId('guidelinesImage');
    const guidelines = getByTestId('guidelinesImage');
 

    expect(imageUploadGuidelines).toContainElement(image);
    expect(imageUploadGuidelines).toContainElement(guidelines);
   
   
    expect(imageUploadGuidelines.getElementsByClassName('pose-image').length).toBe(1);
    expect(imageUploadGuidelines.getElementsByClassName('instructions-mid-section').length).toBe(16);
    

  });
})