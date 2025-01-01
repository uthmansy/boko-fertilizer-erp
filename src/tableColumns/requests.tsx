import { ColumnsType } from "antd/es/table";
import { RequestWithItems } from "../types/db";
import { Tag } from "antd";
import RequestsTableActions from "../components/pages/requests/RequestsTableActions";
// import TransitTableActions from "../components/pages/transit/TransitTableActions";

export const requestsAdminColumns: ColumnsType<RequestWithItems> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date_requested",
    key: "date_requested",
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
    title: "Requested By",
    dataIndex: "requested_by",
    key: "requested_by",
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
    title: "Items",
    key: "items",
    render: (_, record) => (
      <div>
        {record.request_items.map((item) => (
          <div className="flex space-x-3">
            <span>{item.item}:</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
    ),
    width: 170,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <RequestsTableActions request={record} />,
  },
];
