import React from "react";
import "./authentication.css";
import sabioIcon from "../authentication/sabioLogin.png";
import Log from "./Log";
import Reset from "./Reset";
import Signup from "./Signup";
import NewPasw from "./NewPasw";

const Authentication = () => {
  return (
    <div className="login__container">
      <div className="login__icon--container">
      <img src={sabioIcon} alt="sabioIcon" className="login__icon"/>
      </div>
      {/* <Log/> */}
      {/* <Reset/> */}
      <Signup/>
      {/* <NewPasw/> */}
    </div>
  );
};

export default Authentication;
