
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

describe("<Loader />", () => {
 

  test('should render header component', async () => {
    const { getByTestId } = render(<MemoryRouter><HeaderComponent/></MemoryRouter>);

    const header = getByTestId('commonHeader');
    const link = getByTestId('headerLink');
    const logo = getByTestId('headerLogo');
    const cart = getByTestId('cartIcon');
   

    expect(header).toContainElement(link);
    expect(header).toContainElement(logo);
    expect(header).toContainElement(cart);


    // homepage elements
    expect(header.getElementsByClassName('logobarCommon').length).toBe(1);
    expect(header.getElementsByClassName('logoImgCommon').length).toBe(2);

    // sidebar elements

  });



})


