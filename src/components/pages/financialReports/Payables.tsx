import { Button, Card, Statistic, Table } from "antd";
import usePayables from "../../../hooks/usePayables";
import { payablesColumns } from "../../../tableColumns/payables";
import { formatNumber } from "../../../helpers/functions";
import useDarkMode from "../../../store/theme";
import useCsv from "../../../hooks/useCsv";
import { Purchases as PurchasesType } from "../../../types/db";
import { getCsvPayables } from "../../../helpers/apiFunctions";
import { purchasesKeys } from "../../../constants/QUERY_KEYS";
import { Headers } from "react-csv/lib/core";
import { CSVLink } from "react-csv";
import { BorderInnerOutlined } from "@ant-design/icons";

function Payables() {
  const {
    isLoading,
    payables,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    purchasePaymentsBalanceSum,
  } = usePayables();
  const { darkMode } = useDarkMode();

  const { data } = useCsv<PurchasesType[]>({
    queryFn: getCsvPayables,
    queryKey: purchasesKeys.getCsv,
  });

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Order Number", key: "order_number" },
    { label: "Seller", key: "seller" },
    { label: "Price Balance", key: "balance" },
  ];

  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-6 gap-10">
      <div className="md:col-span-2">
        <div
          className={`mb-5 p-5 md:p-10 ${
            darkMode ? "bg-black" : "bg-gray-200"
          }`}
        >
          <Card
            title="Payables Stats"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Total Purchase Payables"
              value={
                purchasePaymentsBalanceSum
                  ? formatNumber(purchasePaymentsBalanceSum)
                  : "NA"
              }
              prefix={"₦"}
            />
          </Card>
        </div>
      </div>
      <div className="md:col-span-4">
        <h2 className="text-3xl mb-5">Purchases</h2>
        {data && (
          <Button className="mb-5" icon={<BorderInnerOutlined />}>
            <CSVLink filename={"payables.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={payablesColumns}
          dataSource={payables}
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
      </div>
    </div>
  );
}

export default Payables;
