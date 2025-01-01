import { ColumnsType } from "antd/es/table";
import { ProductSubmission } from "../types/db";
import { Tag } from "antd";
import SubmissionsTableActions from "../components/pages/productSubmissions/SubmissionsTableActions";
// import ProductSubmissionsTableActions from "../components/pages/productSubmissions/ProductSubmissionsTableActions";

export const productSubmissionsAdminColumns: ColumnsType<ProductSubmission> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date Submitted",
    dataIndex: "date_submitted",
    key: "date_submitted",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 120,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <Tag
        color={`${
          record.status === "pending"
            ? "blue"
            : record.status === "accepted"
            ? "green"
            : "red"
        }`}
      >
        {text}
      </Tag>
    ),
    width: 120,
  },
  {
    title: "Submitted By",
    dataIndex: "submitted_by",
    key: "submitted_by",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 150,
  },
  {
    title: "Accepted By",
    dataIndex: "accepted_by",
    key: "accepted_by",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 150,
  },
  {
    title: "Rejected By",
    dataIndex: "rejected_by",
    key: "rejected_by",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 150,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <SubmissionsTableActions submission={record} />,
  },
];
