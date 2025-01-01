import React from "react";
import useAuthStore from "../../store/auth";
import AccountRestricted from "../../components/pages/accountRestricted/index.tsx";
import MainWindow from "./MainWindow.tsx";
import useWindow from "../../store/window.tsx";
import PosSystem from "./PosSystem.tsx";

const Dashboard: React.FC = () => {
  const { userProfile } = useAuthStore();
  const { currentWindow } = useWindow();

  return userProfile?.restricted ? (
    <AccountRestricted />
  ) : currentWindow === "main" ? (
    <MainWindow />
  ) : (
    <PosSystem />
  );
};

export default Dashboard;
