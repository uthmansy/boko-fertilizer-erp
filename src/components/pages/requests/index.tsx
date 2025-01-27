import RefreshButton from "../../RefreshButton";
import { requestsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllRequests from "./AllRequests";
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { RequestWithItems } from "../../../types/db";
import { Button } from "antd";
import { BorderInnerOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";

type TransformedRequest = Omit<RequestWithItems, "request_items"> & {
  request_items: string;
};

function Requests() {
  const { data } = useCsv<RequestWithItems[]>({
    queryFn: () =>
      getTable<RequestWithItems>("requests", "*, request_items (*)"),
    queryKey: requestsKeys.getCsv,
  });
  const transformedData: TransformedRequest[] | undefined = data?.map(
    (request) => ({
      ...request,
      request_items: request.request_items
        .map((item) => `${item.item} (${item.quantity})`)
        .join(", "),
    })
  );
  const headers: Headers = [
    { label: "Accepted By", key: "accepted_by" },
    { label: "Requests Items", key: "request_items" },
    { label: "Date Requested", key: "date_requested" },
    { label: "Date Accepted", key: "date_accepted" },
    { label: "Date Rejected", key: "date_rejected" },
    { label: "Date Used", key: "date_used" },
    { label: "Requested By", key: "requested_by" },
    { label: "Rejected By", key: "rejected_by" },
    { label: "Used By", key: "used_by" },
    { label: "Status", key: "status" },
    { label: "Used", key: "used" },
    { label: "Warehouse", key: "warehouse" },
  ];

  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={requestsKeys.getAllRequests} />
        <AddNew />
        {transformedData && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={"material-requests.csv"}
              data={transformedData}
              headers={headers}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllRequests />
    </>
  );
}

export default Requests;
