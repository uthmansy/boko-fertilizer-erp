import React, { useState } from "react";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { theme } from "antd";

const menuItems = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
  },
];

const PosSider: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // To track hovered item

  const handleMenuClick = (key: string) => {
    setActiveItem(key);
  };

  const {
    token: { colorBgElevated, colorTextLabel, colorPrimary, colorBgBase },
  } = theme.useToken();

  return (
    <div
      className="h-screen w-28 flex flex-col"
      style={{ background: colorBgElevated }}
    >
      {menuItems.map((item) => (
        <div
          key={item.key}
          style={{
            background: activeItem === item.key ? colorBgBase : "",
            color: hoveredItem === item.key ? colorTextLabel : "", // Custom hover color
            position: "relative", // Allow position-based adjustments for the bar
          }}
          className="flex flex-col items-center justify-center h-24 cursor-pointer transition-colors duration-100"
          onClick={() => handleMenuClick(item.key)}
          onMouseEnter={() => setHoveredItem(item.key)} // On hover
          onMouseLeave={() => setHoveredItem(null)} // On hover leave
        >
          {/* Side bar for the active item */}
          {activeItem === item.key && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "4px",
                backgroundColor: colorPrimary, // Bar color from theme token
              }}
            />
          )}
          <div className="mb-2">{item.icon}</div>
          <span className="text-sm uppercase">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PosSider;
