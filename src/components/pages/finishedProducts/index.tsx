import RefreshButton from "../../RefreshButton";
import { finishedProductsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllFinishedProducts from "./AllFinishedProducts";
import { Breadcrumb, Button } from "antd";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { FinishedProducts as FinishedProductsType } from "../../../types/db";
import { Headers } from "react-csv/lib/core";
// import AllItems from "./AllItems";

function FinishedProducts() {
  const { data } = useCsv<FinishedProductsType[]>({
    queryFn: () => getTable<FinishedProductsType>("finished_products"),
    queryKey: finishedProductsKeys.getCsv,
  });
  const headers: Headers = [
    { label: "Added By", key: "added_by" },
    { label: "Date", key: "date" },
    { label: "Product", key: "product" },
    { label: "Quantity Produced", key: "quantity_produced" },
    { label: "Shift", key: "shift" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Waste", key: "waste" },
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
                <span className="uppercase">Daily Finished Products</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={finishedProductsKeys.getAll} />
        <AddNew />
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"finished-products.csv"}
              data={data}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllFinishedProducts />
    </>
  );
}

export default FinishedProducts;
