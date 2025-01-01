import { ColumnsType } from "antd/es/table";
import { Warehouses } from "../types/db";
import { Space, Tag } from "antd";

export const warehouseAdminColumns: ColumnsType<Warehouses> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
    fixed: "left",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 500,
    render: (text) => <span className="italic">{text}</span>,
  },
  {
    title: "Warehouse Code",
    key: "code",
    dataIndex: "code",
    render: (_, { code }) => (
      <>
        <Tag color="blue">{code}</Tag>
      </>
    ),
  },
  {
    title: "Location",
    key: "location",
    render: (_, { location }) => (
      <Space className="uppercase font-semibold" size="middle">
        {location}
      </Space>
    ),
  },
];
