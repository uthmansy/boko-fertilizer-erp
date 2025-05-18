import { ColumnsType } from "antd/es/table";
import { SalesAndPayments } from "../types/db"; // Use the appropriate type for sales payments
import { formatNumber } from "../helpers/functions";
import ViewSale from "../components/pages/sales/ViewSale";

export const receivablesColumns: ColumnsType<SalesAndPayments> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "To Be Received",
    dataIndex: "payment_balance",
    key: "payment_balance",
    render: (text) => <span className="">{`₦${formatNumber(text)}`}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => (
      <span className="">{record.customer_info.name}</span>
    ),
  },
  {
    title: "Customer Phone",
    dataIndex: "customer_phone",
    key: "customer_phone",
    render: (_, record) => (
      <span className="">{record.customer_info.phone || "NA"}</span>
    ),
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <ViewSale buttonTitle={text} orderNumber={text} />,
  },
];
