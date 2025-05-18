import { ColumnsType } from "antd/es/table";
import { SalesAndPayments } from "../types/db"; // Ensure this matches the updated Sales type
import TableActions from "../components/pages/sales/TableActions";
import ViewSale from "../components/pages/sales/ViewSale";

export const salesAdminColumns: ColumnsType<SalesAndPayments> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{text}</span>, // Adjust formatting as needed
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => (
      <span className="capitalize">{record.customer_info.name}</span>
    ),
  },
  // {
  //   title: "Item",
  //   dataIndex: "item_purchased",
  //   key: "item_purchased",
  //   render: (_, record) => <span className="capitalize">{text}</span>,
  //   width: 120,
  // },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <span>{text || "N/A"}</span>, // Display "N/A" if null
  },
  {
    title: "Customer Phone",
    dataIndex: "customer_phone",
    key: "customer_phone",
    render: (_, record) => <span>{record.customer_info.name || "N/A"}</span>, // Display "N/A" if null
  },
  {
    title: "View",
    key: "View",
    render: (_, record) => (
      <ViewSale buttonTitle="View Sale" orderNumber={record.order_number} />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <TableActions sale={record} orderNumber={record.order_number} />
    ),
  },
];
