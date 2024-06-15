import React from "react";
import ProfileForm from "../../components/profileForm/ProfileForm";
import "../profile/styleProfile.css"

const Profile = () => {
  return (
    <>
    <div className="profile-container">
      <h1>Hola Settings</h1>
      <ProfileForm />
      </div>
    </>
  );
};

export default Profile;