import { Tabs, TabsProps } from "antd";
import Warehouses from "../warehouses/index.tsx";
import Departments from "../departments/index.tsx";
import Positions from "../positions/index.tsx";

function Company() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Warehouses",
      children: <Warehouses />,
    },
    {
      key: "2",
      label: "Departments",
      children: <Departments />,
    },
    {
      key: "3",
      label: "Positions",
      children: <Positions />,
    },
  ];
  return <Tabs size="large" defaultActiveKey="1" items={tabs} />;
}

export default Company;
