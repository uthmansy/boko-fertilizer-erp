import RefreshButton from "../../RefreshButton";
import { stockInKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllStockIns from "./AllStockIns";
import useAuthStore from "../../../store/auth";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { StockIn as StockinType } from "../../../types/db";
import useCsv from "../../../hooks/useCsv";
import { CSVLink } from "react-csv";
import { getTable } from "../../../helpers/apiFunctions";
import { Headers } from "react-csv/lib/core";

function StockIn() {
  const { userProfile } = useAuthStore();
  const { data } = useCsv<StockinType[]>({
    queryFn: () => getTable<StockinType>("stock_in"),
    queryKey: stockInKeys.getCsv,
  });
  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Description", key: "description" },
    { label: "Item", key: "item" },
    { label: "Quantity", key: "quantity" },
    { label: "Stocked By", key: "stocked_by" },
    { label: "Warehouse", key: "warehouse" },
  ];
  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Waste Record</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={stockInKeys.getAll} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "INVENTORY") && <AddNew />}
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"Inventory-items.csv"}
              data={data}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllStockIns />
    </>
  );
}

export default StockIn;
