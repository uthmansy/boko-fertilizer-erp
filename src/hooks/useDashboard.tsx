import { useState } from "react";
import { useMutation } from "react-query";
import useAuthStore from "../store/auth";
import { App, MenuProps } from "antd";
import { useMediaQuery } from "react-responsive";

interface HookReturn {
  collapsed: boolean;
  handleCollapse: () => void;
  isLoading: boolean;
  handleSignOut: () => void;
  isDesktop: boolean;
  isMobile: boolean;
  handleMenuClick: () => void;
  items: MenuProps["items"];
}

function useDashboard(): HookReturn {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuthStore();
  const { message } = App.useApp();
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const handleMenuClick = () => {
    isMobile && handleCollapse();
  };
  const { userProfile } = useAuthStore();

  const { mutate: handleSignOut, isLoading } = useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onError: (error) => {
      message.error(error as string);
    },
  });

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: userProfile?.full_name || "",
    },
    {
      key: "2",
      label: "Logout",
      onClick: handleSignOut as () => void,
    },
  ];

  return {
    collapsed,
    handleCollapse,
    isLoading,
    handleSignOut,
    isDesktop,
    isMobile,
    handleMenuClick,
    items,
  };
}

export default useDashboard;
