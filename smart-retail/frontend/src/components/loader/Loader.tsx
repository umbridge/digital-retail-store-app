import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
import "./Loader.scss"
const Loader = (prop) => {
  return (
    <div className="loaderDiv" data-testid="Loader">
      <HashLoader color="#9C1C8F" className="loader" data-testid="Hashloader"/>
      <div className="loaderText" data-testid="LoaderMsg">
        <p >{prop.loadMessage}</p>
      </div>
      </div>
  )
}

export default Loader