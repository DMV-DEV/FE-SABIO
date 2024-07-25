import  React from "react";
import "../profileForm/stylesProfileForm.css";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, message, Upload, Avatar } from "antd";
import { useState, useEffect } from "react";
import { useGetProfilePictureUrlQuery, useUploadProfilePictureMutation , useUpdateUserInfoMutation} from "../../redux/accountApi";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const userEmail = useSelector((state) => state.user.email);
  const username = useSelector((state) => state.user.name);

  const [email, setEmail] = useState(userEmail);
  const [fullName, setFullName] = useState(username);
  const [profilePicture, setProfilePicture] = useState(null);
  // const [newPassword, setNewPassword] = useState();
  // const [oldPassword, setOldPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  const { data: profilePictureUrl, isLoading: isProfilePictureLoading, isError: isProfilePictureError } = useGetProfilePictureUrlQuery();
  const [uploadProfilePicture, { isLoading: isUploading, isError: isUploadError }] = useUploadProfilePictureMutation();
  const [updateUserInfo, { isLoading: isUpdating, isError: isUpdateError }] = useUpdateUserInfoMutation();
 
  useEffect(() => {
    if (profilePictureUrl) {
      setProfilePicture(profilePictureUrl.imageUrl);
    }
  }, [profilePictureUrl]);

  const handleUploadProfilePicture = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        await uploadProfilePicture({ imageUrl: base64String });
        setProfilePicture(base64String)
        message.success("Profile picture updated successfully!");
      } catch (error) {
        message.error("Error uploading profile picture!");
      }
    };
    reader.onerror = () => {
      message.error("Error reading file!");
    };
  };
  const beforeUpload = (file) => {
    handleUploadProfilePicture(file);
    return false;
  };



  const handleUpdateUserInfo = async () => {
    try {
      await updateUserInfo({ username: fullName, email });
      message.success("User info updated successfully!");
    } catch (error) {
      message.error("Error updating user info!");
    }
  };
  return (
    <div className="profile-form-container">
      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Profile picture</h3>
            <span className="subtitle">Edit your profile picture.</span>
          </div>
          <div className="container-row__col2__1">
            <Avatar size={64} icon={<UserOutlined />} className="avatar" src={profilePicture} />
            <Upload
              action="https://sabiobackend-1a734c145440.herokuapp.com/upload/profile-picture/"  
              beforeUpload={beforeUpload} 
              className="upload-button"
              showUploadList={false}
              accept="image/*" 
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} className="button-upload">
                Change profile picture
              </Button>
            </Upload>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Contact information</h3>
            <span className="subtitle">Change your identity information.</span>
            <button className="button-save" onClick={handleUpdateUserInfo}>
              Save changes
            </button>
          </div>
          <div className="container-row__col2">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <Input
                id="fullName"
                placeholder="Enter your first name"
                type="text"
                className="inputProfile"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Enter your last name"
                type="email"
                className="inputProfile"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Password information</h3>
            <span className="subtitle">Update your password.</span>
            <button className="button-save">Save changes</button>
          </div>
          <div className="container-row__col2">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">New password</label>
                <Input
                  id="newPassword"
                  placeholder="Enter your new password"
                  type="password"
                  className="inputProfile"
                />
              </div>
              <div className="form-group">
                <label htmlFor="oldPassword">Old password</label>
                <Input
                  id="oldPassword"
                  placeholder="Enter your old password"
                  type="password"
                  className="inputProfile"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <Input
                id="confirmPassword"
                placeholder="Re-enter your new password"
                type="password"
                className="inputProfile"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileForm;
