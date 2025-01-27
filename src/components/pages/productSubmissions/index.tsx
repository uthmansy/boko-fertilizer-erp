import RefreshButton from "../../RefreshButton";
import { productSubmissionsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllProductSubmissions from "./AllProductSubmissions";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { ProductSubmission } from "../../../types/db";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import { BorderInnerOutlined } from "@ant-design/icons";
import { Headers } from "react-csv/lib/core";
// import AllItems from "./AllItems";

function ProductSubmissions() {
  const { data } = useCsv<ProductSubmission[]>({
    queryFn: () => getTable<ProductSubmission>("product_submission"),
    queryKey: productSubmissionsKeys.getCsv,
  });

  const headers: Headers = [
    { label: "Date Submitted", key: "date_submitted" },
    { label: "Product", key: "product" },
    { label: "Quantity", key: "quantity" },
    { label: "Status", key: "status" },
    { label: "Date Accepted", key: "date_accepted" },
    { label: "Date Rejected", key: "date_rejected" },
    { label: "Submitted By", key: "submitted_by" },
    { label: "Accepted By", key: "accepted_by" },
    { label: "Rejected By", key: "rejected_by" },
    { label: "Shift", key: "shift" },
    { label: "Warehouse", key: "warehouse" },
  ];

  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={productSubmissionsKeys.getAllSubmissions} />
        <AddNew />
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"product-submission.csv"}
              data={data}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllProductSubmissions />
    </>
  );
}

export default ProductSubmissions;
