import React, { useState } from "react";
import "./authentication.css";
import sabioIcon from "../authentication/sabioLogin.png";
import Log from "./Log";
import Signup from "./Signup";
import Reset from "./Reset";

const Authentication = () => {
  const [activeComponent, setActiveComponent] = useState("Log");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Log":
        return <Log setActiveComponent={setActiveComponent} />;
      case "Signup":
        return <Signup setActiveComponent={setActiveComponent} />;
      case "Reset":
        return <Reset setActiveComponent={setActiveComponent} />;
      default:
        return <Log setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="login__container">
      <div className="login__icon--container">
        <img src={sabioIcon} alt="sabioIcon" className="login__icon" />
      </div>
      <div className="login__form--container">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Authentication;
