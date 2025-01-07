import { ColumnsType } from "antd/es/table";
import { InventoryItems } from "../types/db";
import { Image, Tag } from "antd";
import { formatNumber } from "../helpers/functions";
import TableActions from "../components/pages/inventoryItems.tsx/TableActions";
import { PLACEHOLDER } from "../assets/images";

export const inventoryItemsAdminColumns: ColumnsType<InventoryItems> = [
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
    render: (text) => <span className="font-semibold capitalize">{text}</span>,
  },
  {
    title: "Item Code",
    key: "code",
    dataIndex: "code",
    render: (_, { code }) => (
      <>
        <Tag color="blue">{code}</Tag>
      </>
    ),
  },
  {
    title: "Item Type",
    key: "type",
    dataIndex: "type",
    render: (_, { type }) => (
      <>
        <Tag color="magenta">{type}</Tag>
      </>
    ),
  },
  {
    title: "Item Unit",
    key: "unit",
    dataIndex: "unit",
    render: (_, { unit }) => (
      <>
        <Tag color="geekblue">{unit}</Tag>
      </>
    ),
  },
  {
    title: "Dimension",
    key: "dimension",
    dataIndex: "width",
    render: (_, { width, length }) => (
      <>
        <Tag color="geekblue">
          {width && length ? `${width}x${length} cm` : "NA"}
        </Tag>
      </>
    ),
  },
  {
    title: "Unit Price",
    key: "unit_price",
    dataIndex: "unit_price",
    render: (_, { unit_price }) => (
      <>
        <Tag color="geekblue">
          {unit_price && `₦${formatNumber(unit_price)}`}
        </Tag>
      </>
    ),
  },
  {
    title: "Purchase Cost",
    key: "purchase_cost",
    dataIndex: "purchase_cost",
    render: (_, { purchase_cost }) => (
      <>
        <Tag color="geekblue">
          {purchase_cost && `₦${formatNumber(purchase_cost)}`}
        </Tag>
      </>
    ),
  },
  {
    title: "Image",
    key: "image",
    dataIndex: "image",
    render: (_, { image_public_url }) => (
      <Image
        width={50}
        height={50}
        src={image_public_url || ""}
        fallback={PLACEHOLDER}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions item={record} />,
  },
];
