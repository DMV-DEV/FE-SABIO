/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../profileForm/stylesProfileForm.css"
import { Button, Input } from "antd";

const ProfileForm = () => {
  return (
    <>
      <section>
        <div className="contaienr-row">
          <div className="contaienr-row__col1">
            <h3> Profile picture </h3>
            <p> Edit your profile picture. </p>
          </div>
          <div className="contaienr-row__col2">
            <img  class className="contaienr-row__col2__img" src="https://icon-library.com/images/person-icon-svg/person-icon-svg-2.jpg"/> 
            <button><p>Change profile picture</p></button>
          </div>
        </div>
      </section>

      <section>
        <div className="contaienr-row">
          <div className="contaienr-row__col1">
            <h3> Profile picture </h3>
            <p> Edit your profile picture. </p>
            <button><p>Change profile picture</p></button>
          </div>
          <div className="contaienr-row__col2">
          <Input placeholder="First Name"/>
          <Input placeholder="First Name"/>
          </div>
        </div>
      </section>
      
            <section>
        <div className="contaienr-row">
          <div className="contaienr-row__col1">
            <h3> Profile picture </h3>
            <p> Edit your profile picture. </p>
            <button><p>Change profile picture</p></button>
          </div>
          <div className="contaienr-row__col2">
        <div>
          <Input placeholder="First Name"/>
          <Input placeholder="First Name"/>
        </div>
          <Input placeholder="First Name"/>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileForm;
