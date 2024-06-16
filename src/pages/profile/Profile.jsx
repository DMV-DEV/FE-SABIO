import React from "react";
import ProfileForm from "../../components/profileForm/ProfileForm";
import "../profile/styleProfile.css"

const Profile = () => {
  return (
    <>
    <div className="containerPage">
      <h1>Account Settings</h1>
      <ProfileForm />
    </div>
    </>
  );
};

export default Profile;