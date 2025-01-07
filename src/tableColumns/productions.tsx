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
      <div>
        {record.production_raw_materials.map((item) => (
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
    render: (_, record) => <ProductionTableActions production={record} />,
  },
];
