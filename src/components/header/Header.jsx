import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar, Button, Menu } from "antd";
import "./StyleHeader.css";
import { SettingIcon } from "../../assets/icons/Settings";
// import { IacheckerIcon } from '../../assets/icons/IaChecker';
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let pathText = "";

  const handleLogout = () => {
    // Eliminar tokens del localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userState");

    // Limpiar el estado de usuario en Redux (opcional)
    dispatch(logoutUser());

    // Redirigir al usuario a la página de login
    navigate("/authentication");
  };

  if (location.pathname === "/dashboard") {
    pathText = " / Analytics";
  } else if (location.pathname === "/myclasses") {
    pathText = " / My classes";
  } else if (location.pathname === "/documents") {
    pathText = " / Classes";
  } else if (location.pathname === "/accountsettings") {
    pathText = " / Account settings";
  } else if (location.pathname === "/checker") {
    pathText = " / AI checker";
  } else if (location.pathname === "/students") {
    pathText = " / Students";
  }
  const items = [
    {
      label: (
        <span
          className="link"
          onClick={() => {
            navigate("/accountsettings");
          }}
        >
          Account settings
        </span>
      ),
      key: "0",
      icon: <SettingIcon />,
    },
  ];

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: 16 }}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item key="logout" style={{ textAlign: "center" }}>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{
            backgroundColor: "#EF8F37",
            borderColor: "#EF8F37 !important",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            fontSize: 16,
            width: "150px",
            padding: "0 16px",
          }}
        >
          <LogoutIcon style={{ marginRight: 8 }} />
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header__paths">
        <p>
          <div className="header__paths">
            Dashboard&nbsp; <span style={{ color: "#1C4B82" }}>{pathText}</span>
          </div>
        </p>
      </div>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        className="header__dropdownMenu"
      >
        {/* <a onClick={(e) => e.preventDefault()}> */}
          <Space>
            <div>
              <p className="header__user-info">{user.first_name}</p>
            </div>
            <Avatar size={50} icon={<UserOutlined />} />
            <DownOutlined />
          </Space>
        {/* </a> */}
      </Dropdown>
    </header>
  );
};

export default Header;
