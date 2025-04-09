import { Tabs, TabsProps } from "antd";
import InternalDispatch from "../internalDispatch/index.tsx";
import ExternalDispatch from "../externalDispatch/index.tsx";
import Transit from "../transit/index.tsx";
import ReceivedVehicles from "../receivedVehicles/index.tsx";
import DispatchedVehicles from "../dispatchedVehicles/index.tsx";
import ScanWaybill from "../scanWaybill/index.tsx";

function Logistics() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Dispatch (from warehouse)",
      children: <InternalDispatch />,
    },
    {
      key: "2",
      label: "Dispatch (to warehouse)",
      children: <ExternalDispatch />,
    },
    {
      key: "3",
      label: "Transit Vehicles",
      children: <Transit />,
    },
    {
      key: "4",
      label: "Received",
      children: <ReceivedVehicles />,
    },
    {
      key: "5",
      label: "Delivered",
      children: <DispatchedVehicles />,
    },
    {
      key: "6",
      label: "Scan Waybill",
      children: <ScanWaybill />,
    },
  ];
  return (
    <Tabs
      destroyInactiveTabPane
      size="large"
      defaultActiveKey="1"
      items={tabs}
    />
  );
}

export default Logistics;
