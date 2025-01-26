import { Tabs, TabsProps } from "antd";
import Employees from "../employees/index.tsx";
import Payrolls from "../payrolls/index.tsx";

function Hr() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Employees",
      children: <Employees />,
    },
    {
      key: "2",
      label: "Payrolls",
      children: <Payrolls />,
    },
  ];
  return <Tabs size="large" defaultActiveKey="1" items={tabs} />;
}

export default Hr;
