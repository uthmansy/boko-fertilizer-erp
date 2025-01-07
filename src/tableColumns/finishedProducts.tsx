import { ColumnsType } from "antd/es/table";
import { formatNumber } from "../helpers/functions";
import { FinishedProductsJoint } from "../types/db";
import FinishedProductsTableActions from "../components/pages/finishedProducts/FinishedProductsTableActions";

export const finishedProductsColumns: ColumnsType<FinishedProductsJoint> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Shift",
    dataIndex: "shift",
    key: "shift",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Production Staff",
    dataIndex: "added_by",
    key: "added_by",
    render: (_, record) => (
      <span className="capitalize">{record.staff.full_name}</span>
    ),
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Quantity Produced",
    dataIndex: "quantity_produced",
    key: "quantity_produced",
    render: (text) => <span className="capitalize">{formatNumber(text)}</span>,
  },
  {
    title: "Waste",
    dataIndex: "waste",
    key: "waste",
    render: (text) => <span className="capitalize">{formatNumber(text)}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <FinishedProductsTableActions finishedProduct={record} />
    ),
  },
];
