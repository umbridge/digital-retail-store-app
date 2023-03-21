import { useState, CSSProperties } from "react";
import React from 'react'
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  position: "fixed",
  top: "40%",
left: "45%",
zIndex: 7,
};

function App() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#9C1C8F");

  return (
    <>
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    <div style={{ position: "fixed",
  top: "45%",
left: "45%",
zIndex: 7,}}>Loading...</div>
    </>
  );
}

export default App;