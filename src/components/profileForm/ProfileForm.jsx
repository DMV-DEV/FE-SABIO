import React from "react";
import "../profileForm/stylesProfileForm.css";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, message, Upload, Avatar } from "antd";

const ProfileForm = () => {
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
            <Avatar size={64} icon={<UserOutlined />} className="avatar" />
            <Upload {...props} className="upload-button">
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
            <button className="button-save">Save changes</button>
          </div>
          <div className="container-row__col2">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <Input
                id="fullName"
                placeholder="Enter your first name"
                type="text"
                className="inputProfile"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Enter your last name"
                type="email"
                className="inputProfile"
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
