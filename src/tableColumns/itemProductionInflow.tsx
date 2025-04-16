import { ColumnsType } from "antd/es/table";
import { ItemInflowType } from "../hooks/useItemRequestInflow";
// import TransitTableActions from "../components/pages/transit/TransitTableActions";

export const intemProductionInflowColumns: ColumnsType<ItemInflowType> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    render: (_, record) => record.date, // Calculate row number
  },
  {
    title: "Item",
    render: (_, record) => record.item, // Calculate row number
  },
  {
    title: "Quantity",
    render: (_, record) => record.total_quantity, // Calculate row number
  },
];
