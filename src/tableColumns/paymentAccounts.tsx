import { ColumnsType } from "antd/es/table";
import { PaymentAccounts } from "../types/db"; // Ensure this matches the updated Sales type

export const paymentAccountsColumns: ColumnsType<PaymentAccounts> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Account Alias",
    dataIndex: "alias",
    key: "alias",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
  {
    title: "Bank Name",
    dataIndex: "bank_name",
    key: "bank_name",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
  {
    title: "Account Number",
    dataIndex: "account_number",
    key: "account_number",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
];
