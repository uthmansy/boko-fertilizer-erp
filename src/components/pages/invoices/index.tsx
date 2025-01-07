import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Tabs, TabsProps } from "antd";
import TabLabel from "../../TabLabel";
import { VscSettingsGear } from "react-icons/vsc";
import Accounts from "./Accounts";

function Invoices() {
  const tabs: TabsProps["items"] = [
    // {
    //   key: "1",
    //   label: <TabLabel Icon={VscNotebookTemplate} label="Invoices" />,
    //   children: <div>placeholder</div>,
    // },
    {
      key: "1",
      label: <TabLabel Icon={VscSettingsGear} label="Payment Accounts" />,
      children: <Accounts />,
    },
  ];
  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Invoices</span>
              </>
            ),
          },
        ]}
      />
      <Tabs size="large" defaultActiveKey="1" items={tabs} />
    </>
  );
}

export default Invoices;
