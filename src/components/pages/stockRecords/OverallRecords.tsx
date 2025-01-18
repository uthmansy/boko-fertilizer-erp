import { Card, Statistic } from "antd";
import { formatNumber } from "../../../helpers/functions";
import { StocksWithDetails } from "../../../types/db";
import useDarkMode from "../../../store/theme";

interface Props {
  record: StocksWithDetails;
}

function OverallRecords({ record }: Props) {
  const { darkMode } = useDarkMode();
  return (
    <>
      <h2 className="mb-5 uppercase">Overall</h2>
      <div
        className={`mb-5 p-5 md:p-10 ${darkMode ? "bg-black" : "bg-gray-200"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Card
            title="Balance in store"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Balance in store"
              value={formatNumber(
                (record.balance || 0) + record.production_balance
              )}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          <Card
            title="Quantity received"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Balance in store"
              value={record.received ? formatNumber(record.received) : "NA"}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          <Card
            title="Quantity dispatched"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Quantity Dispatched"
              value={record.dispatched ? formatNumber(record.dispatched) : "NA"}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          <Card title="Quantity Used" bordered={true} style={{ width: "100%" }}>
            <Statistic
              title="Quantity Used"
              value={record.utilized ? formatNumber(record.utilized) : "NA"}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default OverallRecords;
