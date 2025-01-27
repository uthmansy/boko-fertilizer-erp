import RefreshButton from "../../RefreshButton";
import { productionsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllProductions from "./AllProductions";
import { Breadcrumb, Button } from "antd";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { Productions } from "../../../types/db";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";
// import AllItems from "./AllItems";

function ProductionRuns() {
  const { data } = useCsv<Productions[]>({
    queryFn: () => getTable<Productions>("production_runs"),
    queryKey: productionsKeys.getRunsCsv,
  });
  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Produced By", key: "produced_by" },
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
                <span className="uppercase">Production Runs</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={productionsKeys.getAllProductions} />
        <AddNew />
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
      <AllProductions />
    </>
  );
}

export default ProductionRuns;
