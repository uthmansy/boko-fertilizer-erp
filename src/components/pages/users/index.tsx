import { Tabs, TabsProps } from "antd";
import UserManagement from "../userManagement/index.tsx";
import Enrollment from "../enrollment/index.tsx";

function Users() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "User Management",
      children: <UserManagement />,
    },
    {
      key: "2",
      label: "User Enrollment",
      children: <Enrollment />,
    },
  ];
  return <Tabs size="large" defaultActiveKey="1" items={tabs} />;
}

export default Users;
