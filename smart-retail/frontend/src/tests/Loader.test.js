
import React from 'react';
import { render} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Loader from "../components/loader/Loader"

describe("<Loader />", () => {
 

  test('should render sidebar', async () => {
    const { getByTestId } = render(<MemoryRouter><Loader/></MemoryRouter>);

    const loader = getByTestId('Loader');
    const hashLoader = getByTestId('Hashloader');
    const msg = getByTestId('LoaderMsg');
   

    expect(loader).toContainElement(hashLoader);
    expect(loader).toContainElement(msg);


    // homepage elements
    expect(loader.getElementsByClassName('loader').length).toBe(1);
    expect(loader.getElementsByClassName('loaderText').length).toBe(1);


    // sidebar elements

  });





})


