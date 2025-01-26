import { ColumnsType } from "antd/es/table";
import { ProductSubmissionWithDetails } from "../types/db";
import { Tag } from "antd";
import SubmissionsTableActions from "../components/pages/productSubmissions/SubmissionsTableActions";
// import ProductSubmissionsTableActions from "../components/pages/productSubmissions/ProductSubmissionsTableActions";

export const productSubmissionsAdminColumns: ColumnsType<ProductSubmissionWithDetails> =
  [
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
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      key: "warehouse",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <span className="capitalize">
          {record.quantity} {record.product_info.unit}
        </span>
      ),
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
    },
    {
      title: "Submitted By",
      dataIndex: "submitted_by",
      key: "submitted_by",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Accepted By",
      dataIndex: "accepted_by",
      key: "accepted_by",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Rejected By",
      dataIndex: "rejected_by",
      key: "rejected_by",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <SubmissionsTableActions submission={record} />,
    },
  ];
