import RefreshButton from "../../RefreshButton";
import { productionsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllProductions from "./AllProductions";
import { Breadcrumb, Button } from "antd";
import { BorderInnerOutlined, HomeOutlined } from "@ant-design/icons";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { ProductionWithItems } from "../../../types/db";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";
// import AllItems from "./AllItems";

function ProductionRuns() {
  const { data } = useCsv<ProductionWithItems[]>({
    queryFn: () =>
      getTable<ProductionWithItems>(
        "production_runs",
        "*, production_raw_materials (*), product_info:product(*)"
      ),
    queryKey: productionsKeys.getRunsCsv,
  });

  const flatRawMaterials =
    data?.flatMap((p) => p.production_raw_materials) || [];

  const rawMaterialsHeaders = Array.from(
    new Set(flatRawMaterials.map((item) => item.item))
  ).map((item) => ({ label: item, key: item }));

  const transformedData = data?.map((production) => {
    // Create accumulator for quantities
    const itemTotals = production.production_raw_materials.reduce(
      (acc, material) => {
        //@ts-ignore
        acc[material.item] = (acc[material.item] || 0) + material.quantity;
        return acc;
      },
      {}
    );

    // Return new object with merged properties
    return {
      ...production,
      ...itemTotals,
    };
  });

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Produced By", key: "produced_by" },
    { label: "Shift", key: "shift" },
    { label: "Warehouse", key: "warehouse" },
    { label: "Waste", key: "waste" },
    { label: "Product", key: "product" },
    { label: "Quantity Produced", key: "quantity_produced" },
    ...rawMaterialsHeaders,
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
        {transformedData && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"Inventory-items.csv"}
              data={transformedData}
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
