import React from "react";
import "../profileForm/stylesProfileForm.css";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, message, Upload, Avatar } from "antd";
import { useState, useEffect } from "react";
import { useGetProfilePictureUrlQuery, useUploadProfilePictureMutation, useUpdateUserInfoMutation } from "../../redux/accountApi";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '../../redux/userSlice';

// Schema for profile form validation
const profileSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  fullName: yup.string().required("Full name is required"),
});

// Schema for password form validation
const passwordSchema = yup.object().shape({
  newPassword: yup.string().min(8, "Password must be at least 8 characters long").required("New password is required"),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "Passwords must match").required("Confirm password is required"),
  oldPassword: yup.string().required("Old password is required"),
});

const ProfileForm = () => {
  const userId = useSelector((state) => state.user.id);
  const userEmail = useSelector((state) => state.user.email);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const profilePic = useSelector((state) => state.user.foto);
  const [profilePicture, setProfilePicture] = useState(profilePic);

  const { control: profileControl, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: userEmail,
      fullName: username,
    }
  });

  const { control: passwordControl, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const { data: profilePictureUrl } = useGetProfilePictureUrlQuery(userId);
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (profilePictureUrl) {
      setProfilePicture(profilePictureUrl.imageUrl);
    }
  }, [profilePictureUrl]);

  const handleUploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      await uploadProfilePicture(formData).unwrap();
      setProfilePicture(URL.createObjectURL(file));
      message.success("Profile picture updated successfully!");
    } catch (error) {
      message.error("Error uploading profile picture!");
    }
  };

  const beforeUpload = (file) => {
    handleUploadProfilePicture(file);
    return false;
  };

  const handleUpdateUserInfo = async (data) => {
    try {
      const result = await updateUserInfo({ username: data.fullName, email: data.email }).unwrap();
      dispatch(updateUser({ username: result.username, email: result.email }));
      message.success("User info updated successfully!");
    } catch (error) {
      message.error("Error updating user info!");
    }
  };

  const handleUpdatePassword = async (data) => {
    // Handle password update logic here
  };

  return (
    <div className="profile-form-container">
      {/* Profile Form */}
      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Profile picture</h3>
            <span className="subtitle">Edit your profile picture.</span>
          </div>
          <div className="container-row__col2__1">
            <Avatar size={64} icon={<UserOutlined />} className="avatar" src={profilePicture} />
            <Upload
              action="https://sabiobackend-1a734c145440.herokuapp.com/upload/profile-picture"
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

      {/* Profile Information Form */}
      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Contact information</h3>
            <span className="subtitle">Change your identity information.</span>
            <button type="submit" className="button-save" onClick={handleProfileSubmit(handleUpdateUserInfo)}>
              Save changes
            </button>
          </div>
          <div className="container-row__col2">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <Controller
                name="fullName"
                control={profileControl}
                render={({ field }) => (
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className={`inputProfile ${profileErrors.fullName ? 'input-error' : ''}`}
                    {...field}
                  />
                )}
              />
              {profileErrors.fullName && <p className="error-message">{profileErrors.fullName.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Controller
                name="email"
                control={profileControl}
                render={({ field }) => (
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    className={`inputProfile ${profileErrors.email ? 'input-error' : ''}`}
                    {...field}
                  />
                )}
              />
              {profileErrors.email && <p className="error-message">{profileErrors.email.message}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Password Form */}
      <section className="form-section">
        <div className="container-row">
          <div className="container-row__col1">
            <h3>Password information</h3>
            <span className="subtitle">Update your password.</span>
            <button type="submit" className="button-save" onClick={handlePasswordSubmit(handleUpdatePassword)}>
              Save changes
            </button>
          </div>
          <div className="container-row__col2">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newPassword">New password</label>
                <Controller
                  name="newPassword"
                  control={passwordControl}
                  render={({ field }) => (
                    <Input
                      id="newPassword"
                      placeholder="Enter your new password"
                      type="password"
                      className={`inputProfile ${passwordErrors.newPassword ? 'input-error' : ''}`}
                      {...field}
                    />
                  )}
                />
                {passwordErrors.newPassword && <p className="error-message">{passwordErrors.newPassword.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="oldPassword">Old password</label>
                <Controller
                  name="oldPassword"
                  control={passwordControl}
                  render={({ field }) => (
                    <Input
                      id="oldPassword"
                      placeholder="Enter your old password"
                      type="password"
                      className={`inputProfile ${passwordErrors.oldPassword ? 'input-error' : ''}`}
                      {...field}
                    />
                  )}
                />
                {passwordErrors.oldPassword && <p className="error-message">{passwordErrors.oldPassword.message}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <Controller
                name="confirmPassword"
                control={passwordControl}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    placeholder="Re-enter your new password"
                    type="password"
                    className={`inputProfile ${passwordErrors.confirmPassword ? 'input-error' : ''}`}
                    {...field}
                  />
                )}
              />
              {passwordErrors.confirmPassword && <p className="error-message">{passwordErrors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileForm;