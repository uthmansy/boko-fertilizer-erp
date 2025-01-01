import { ColumnsType } from "antd/es/table";
import { SubItemsWithDetails } from "../types/db";
import { Image, Tag } from "antd";
import { formatNumber } from "../helpers/functions";
import { PLACEHOLDER } from "../assets/images";

export const inventorySubItemsColumns: ColumnsType<SubItemsWithDetails> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Name",
    dataIndex: "item",
    key: "item",
    render: (text) => <span className="font-semibold capitalize">{text}</span>,
    width: 200,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) => (
      <span className="font-semibold capitalize">
        {record.quantity} {record.item_info.unit}
      </span>
    ),
    width: 200,
  },
  {
    title: "Item Unit",
    key: "unit",
    dataIndex: "unit",
    render: (_, { item_info }) => (
      <>
        <Tag color="geekblue">{item_info.unit}</Tag>
      </>
    ),
    width: 80,
  },
  {
    title: "Unit Price",
    key: "unit_price",
    dataIndex: "unit_price",
    render: (_, { item_info }) => (
      <>
        <Tag color="geekblue">
          {item_info.unit_price && `₦${formatNumber(item_info.unit_price)}`}
        </Tag>
      </>
    ),
    width: 80,
  },
  {
    title: "Image",
    key: "image",
    dataIndex: "image",
    render: (_, { item_info }) => (
      <Image
        width={50}
        height={50}
        src={item_info.image_public_url || ""}
        fallback={PLACEHOLDER}
      />
    ),
    width: 120,
  },
];
