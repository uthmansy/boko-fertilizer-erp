import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { purchasesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllPurchases from "./AllPurchases";
import { Breadcrumb, Button } from "antd";
import { Purchases as PurchasesType } from "../../../types/db";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";

function Purchases() {
  const { data } = useCsv<PurchasesType[]>({
    queryFn: () => getTable<PurchasesType>("stock_purchases"),
    queryKey: purchasesKeys.getCsv,
  });

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Order Number", key: "order_number" },
    { label: "Item", key: "item" },
    { label: "Seller", key: "seller" },
    { label: "Price", key: "price" },
    { label: "Paid", key: "paid" },
    { label: "Price Balance", key: "balance" },
    { label: "Quantity", key: "quantity" },
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
                <span className="uppercase">Purchases</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={purchasesKeys.getAllPurchases} />
        <AddNew />
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink filename={"purchases.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllPurchases />
    </>
  );
}

export default Purchases;
