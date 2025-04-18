import { ColumnsType } from "antd/es/table";
import { SalesPaymentsJoined } from "../types/db"; // Use the appropriate type for sales payments
import { formatNumber } from "../helpers/functions";
import { Image } from "antd";
import { PLACEHOLDER } from "../assets/images";
import SalesPaymentActions from "../components/pages/sales/SalesPaymentActions";
import ViewSale from "../components/pages/sales/ViewSale";

export const salesPaymentsAdminColumns: ColumnsType<SalesPaymentsJoined> = [
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
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <ViewSale buttonTitle={text} orderNumber={text} />,
  },
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (_, record) => (
      <span className="capitalize font-semibold">
        {record.sale.customer_name}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <span className="">{`₦${formatNumber(text)}`}</span>,
  },
  {
    title: "Account Number",
    dataIndex: "account_number",
    key: "account_number",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Bank Name",
    dataIndex: "bank_name",
    key: "bank_name",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Payment Ref",
    dataIndex: "payement_ref",
    key: "payement_ref",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Payment Mode",
    dataIndex: "payment_mode",
    key: "payment_mode",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },

  {
    title: "Receipt",
    key: "receipt",
    dataIndex: "receipt",
    render: (_, { receipt }) => (
      <Image
        width={50}
        height={30}
        src={receipt || ""}
        fallback={PLACEHOLDER}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <SalesPaymentActions payment={record} />,
  },
];
