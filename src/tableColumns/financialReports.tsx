import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { formatNumber } from "../helpers/functions";
import { FinancialReport } from "../types/api";
import { Tag } from "antd";

export const financialReportsColumns: ColumnsType<FinancialReport> = [
  {
    title: "Month",
    dataIndex: "year_month",
    key: "year_month",
    render: (date) => <span>{dayjs(date, "YYYY-MM").format("MMMM YYYY")}</span>, // Format date
  },
  {
    title: "Total Sales Value",
    dataIndex: "total_sales",
    key: "total_sales",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Cost Of Goods",
    dataIndex: "total_item_cost",
    key: "total_item_cost",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Expenses",
    dataIndex: "total_expenses",
    key: "total_expenses",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Payroll",
    dataIndex: "total_payroll",
    key: "total_payroll",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Transport",
    dataIndex: "total_vehicle_fees",
    key: "total_vehicle_fees",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Total Profit",
    dataIndex: "profit",
    key: "profit",
    render: (text) => (
      <Tag
        color={text > 0 ? "green" : "red"}
        className="capitalize"
      >{`₦${formatNumber(text)}`}</Tag>
    ),
  },
];
