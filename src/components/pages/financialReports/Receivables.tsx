import { Button, Card, Statistic, Table } from "antd";
import useReceivables from "../../../hooks/useReceivables";
import { receivablesColumns } from "../../../tableColumns/receivables";
import { formatNumber } from "../../../helpers/functions";
import useDarkMode from "../../../store/theme";
import useCsv from "../../../hooks/useCsv";
import { Sales } from "../../../types/db";
import { getCsvReceivables } from "../../../helpers/apiFunctions";
import { salesKeys } from "../../../constants/QUERY_KEYS";
import { BorderInnerOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";

function Receivables() {
  const { debouncedSearchTerm, searchTerm, handleSearchChange, resetFilters } =
    useFilters();

  const {
    isLoading,
    receivables,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    salesPaymentsBalanceSum,
  } = useReceivables({ debouncedSearch: debouncedSearchTerm });
  const { darkMode } = useDarkMode();

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Customer", key: "customer_info.name" },
    { label: "Order Number", key: "order_number" },
    { label: "Customer Phone", key: "customer_info.phone" },
    { label: "To be received", key: "payment_balance" },
  ];

  const { data } = useCsv<Sales[]>({
    queryFn: getCsvReceivables,
    queryKey: salesKeys.getCsvData,
  });

  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-6 gap-10">
      <div className="md:col-span-2">
        <div
          className={`mb-5 p-5 md:p-10 ${
            darkMode ? "bg-black" : "bg-gray-200"
          }`}
        >
          <Card
            title="Receivables Stats"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Total Receivables from Sales"
              value={
                salesPaymentsBalanceSum
                  ? formatNumber(salesPaymentsBalanceSum)
                  : "NA"
              }
              prefix={"₦"}
            />
          </Card>
        </div>
      </div>
      <div className="md:col-span-4">
        {/* <h2 className="text-3xl mb-5">Sales</h2> */}
        {data && (
          <Button className="mb-5" icon={<BorderInnerOutlined />}>
            <CSVLink filename={"Receivables.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <Filters
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          searchPlaceholder="search customer"
          onReset={resetFilters}
        />
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={receivablesColumns}
          dataSource={receivables}
          pagination={false}
          scroll={{ y: 450, x: "max-content" }}
          bordered
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            if (
              Math.round(target.scrollHeight - target.scrollTop) ===
              target.clientHeight
            ) {
              fetchNextPage();
            }
          }}
        />
      </div>{" "}
    </div>
  );
}

export default Receivables;
