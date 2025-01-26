import { Tabs, TabsProps } from "antd";
import StockRecords from "../stockRecords";
import ExternalStockRecords from "../externalStockRecords";
import InventoryItems from "../inventoryItems.tsx";
import InventoryTransfers from "../inventoryTransfers";
import StockIn from "../stockIn";

function Inventory() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Stock Records",
      children: <StockRecords />,
    },
    {
      key: "2",
      label: "External Stock",
      children: <ExternalStockRecords />,
    },
    {
      key: "3",
      label: "Inventory Items",
      children: <InventoryItems />,
    },
    {
      key: "4",
      label: "Inventory Transfer",
      children: <InventoryTransfers />,
    },
    {
      key: "5",
      label: "Waste Record",
      children: <StockIn />,
    },
  ];
  return <Tabs size="large" defaultActiveKey="1" items={tabs} />;
}

export default Inventory;
