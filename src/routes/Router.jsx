import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/authentication/Authentication";
// import ErrorPage from '../pages/error/ErrorPage'; // Si tienes ErrorPage, descomenta esto

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />, // Si tienes ErrorPage, descomenta esto
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
