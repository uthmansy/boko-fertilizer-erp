import { Card, Statistic } from "antd";
import { StocksWithDetails } from "../../../types/db";
import useDarkMode from "../../../store/theme";
import { formatNumber } from "../../../helpers/functions";

interface Props {
  record: StocksWithDetails;
}

function ProductionRecords({ record }: Props) {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <h2 className="mb-5 uppercase">Production Records</h2>
      <div
        className={`mb-5 p-5 md:p-10 ${darkMode ? "bg-black" : "bg-gray-200"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card title="Balance" bordered={true} style={{ width: "100%" }}>
            <Statistic
              title="Balance"
              value={formatNumber(record.production_balance)}
              suffix={
                <span className="text-sm uppercase">
                  {record.item_info.unit}
                </span>
              }
            />
          </Card>
          {record.item_info.type === "raw" && (
            <Card
              title="Received from inventory"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Received from inventory"
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
          {record.item_info.type === "raw" && (
            <Card
              title="Quantity Used"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Used for production"
                value={record.utilized ? formatNumber(record.utilized) : "NA"}
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
              title="Quantity Produced"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Quantity Produced"
                value={record.produced ? formatNumber(record.produced) : "NA"}
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
              title="Quantity Submitted to inventory"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Submitted to inventory"
                value={
                  record.utilized && record.produced
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

export default ProductionRecords;
