import { ColumnsType } from "antd/es/table";
import { PurchasePayments } from "../types/db";
import { formatNumber } from "../helpers/functions";
import PurchcasePaymentActions from "../components/pages/purchases/PurchasePaymentActions";
import ViewPurchase from "../components/pages/purchases/ViewPurchase";

export const purchasesPaymentsAdminColumns: ColumnsType<PurchasePayments> = [
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
    dataIndex: "payment_ref",
    key: "payment_ref",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Payment Mode",
    dataIndex: "payment_mode",
    key: "payment_mode",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <ViewPurchase buttonTitle={text} orderNumber={text} />,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <PurchcasePaymentActions payment={record} />,
  },
];
