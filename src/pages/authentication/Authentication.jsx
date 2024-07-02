import React from "react";
import "./authentication.css";
import sabioIcon from "../authentication/sabioLogin.png";
import Signin from "./Signin";
import Reset from "./Reset";
import Login from "./Login";
import NewPasw from "./NewPasw";

const Authentication = () => {
  return (
    <div className="login__container">
      <img src={sabioIcon} alt="sabioIcon" className="login__icon"/>
      {/* <Signin/> */}
      {/* <Reset/> */}
      <Login/>
      {/* <NewPasw/> */}
    </div>
  );
};

export default Authentication;
