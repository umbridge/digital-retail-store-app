
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App.js";

jest.mock("react-dom/client", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
  });
});