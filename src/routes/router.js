import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import Home from "../pages/home/Home";
import App from "../App";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);