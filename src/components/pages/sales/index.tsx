import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { salesKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllSales from "./AllSales";
import { Breadcrumb, Button } from "antd";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";
import { getSalesCsvData } from "../../../helpers/apiFunctions";
import { Sales as SalesType } from "../../../types/db";
import useCsv from "../../../hooks/useCsv";

function Sales() {
  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Customer", key: "customer_name" },
    { label: "Customer Phone", key: "customer_phone" },
    { label: "Item", key: "item_purchased" },
    { label: "Quantity", key: "quantity" },
    { label: "Quantity Taken", key: "quantity_taken" },
    { label: "Quantity Balance", key: "balance" },
    { label: "Price", key: "price" },
    { label: "Paid", key: "paid" },
    { label: "Payment Balance", key: "payment_balance" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Sale Type", key: "type" },
  ];
  const { userProfile } = useAuthStore();
  const { data } = useCsv<SalesType[]>({
    queryFn: getSalesCsvData,
    queryKey: salesKeys.getCsvData,
  });
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
                <span className="uppercase">Sales</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={salesKeys.getAllSales} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "ACCOUNTING") && <AddNew />}
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink filename={"Sales.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllSales />
    </>
  );
}

export default Sales;
