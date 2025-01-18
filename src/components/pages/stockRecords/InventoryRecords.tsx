import { Card, Statistic } from "antd";
import useDarkMode from "../../../store/theme";
import { StocksWithDetails } from "../../../types/db";
import { formatNumber } from "../../../helpers/functions";

interface Props {
  record: StocksWithDetails;
}

function InventoryRecords({ record }: Props) {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <h2 className="mb-5 uppercase">Inventory Records</h2>
      <div
        className={`mb-5 p-5 md:p-10 ${darkMode ? "bg-black" : "bg-gray-200"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Card title="Balance" bordered={true} style={{ width: "100%" }}>
            <Statistic
              title="Balance"
              value={record.balance ? formatNumber(record.balance) : "NA"}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          <Card
            title="Quantity Received"
            bordered={true}
            style={{ width: "100%" }}
          >
            <Statistic
              title="Quantity Received"
              value={record.received ? formatNumber(record.received) : "NA"}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          <Card
            title="Quantity Dispatched"
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
          {record.item_info.type === "raw" && (
            <Card
              title="Sent to Production Unit"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Sent to Production"
                value={
                  record.production_inflow
                    ? formatNumber(record.production_inflow)
                    : "NA"
                }
                suffix={
                  <span className="text-sm uppercase">
                    {record.item_info.unit}
                  </span>
                }
              />
            </Card>
          )}
          {record.item_info.type === "product" && (
            <Card
              title="Quantity Received From Production Unit"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="received from production unit"
                value={
                  record.produced && record.production_balance
                    ? formatNumber(record.produced - record.production_balance)
                    : "NA"
                }
                suffix={
                  <span className="text-sm uppercase">
                    {record.item_info.unit}
                  </span>
                }
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryRecords;
