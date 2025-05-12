import { ColumnsType } from "antd/es/table";
import { ProductionWithItems } from "../types/db";
import ProductionTableActions from "../components/pages/productionRuns/ProductionTableActions";
import { formatNumber } from "../helpers/functions";

export const productionsAdminColumns: ColumnsType<ProductionWithItems> = [
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
    title: "Production Staff",
    dataIndex: "produced_by",
    key: "produced_by",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  // {
  //   title: "Length",
  //   dataIndex: "product",
  //   key: "product_cutting_lenght",
  //   render: (_, record) => (
  //     <span className="capitalize">{record.product_info.length} CM</span>
  //   ),
  // },
  {
    title: "Quantity Produced",
    dataIndex: "quantity_produced",
    key: "quantity_produced",
    render: (text) => <span className="capitalize">{formatNumber(text)}</span>,
  },
  // {
  //   title: "Waste",
  //   dataIndex: "waste",
  //   key: "waste",
  //   render: (text) => <span className="capitalize">{formatNumber(text)}</span>,
  // },
  {
    title: "Raw Materials",
    key: "production_raw_materials",
    render: (_, record) => (
      <div className="grid grid-cols-1 md:grid-cols-2">
        {record.production_raw_materials.map((item) => (
          <div className="flex space-x-3 text-xs">
            <span>{item.item}:</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => <ProductionTableActions production={record} />,
  },
];
