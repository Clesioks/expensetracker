import React from "react";
import "../resources/default-layout.css";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
  const navigate = useNavigate();

  const items = [
    {
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("sheymoney-udemy-user");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Shey Money</h1>
        </div>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <button className="primary">{user.name}</button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
