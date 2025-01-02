import { Button, Table } from "antd";
import { FinancialReport } from "../../../types/api";
import { financialReportsColumns } from "../../../tableColumns/financialReports";
import { CSVLink } from "react-csv";
import { BorderInnerOutlined } from "@ant-design/icons";
import { Headers } from "react-csv/lib/core";

interface Props {
  isLoading: boolean;
  isRefetching: boolean;
  reports: FinancialReport[];
  csvHeaders: Headers;
}

function Ledger({ isLoading, isRefetching, reports, csvHeaders }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 py-10">
      <div>
        {reports && (
          <div className="mb-5 flex justify-end">
            <Button type="primary" icon={<BorderInnerOutlined />}>
              <CSVLink
                filename={"Monthly-ledger.csv"}
                data={reports}
                headers={csvHeaders}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </div>
        )}

        <Table
          size="small"
          loading={isLoading || isRefetching}
          columns={financialReportsColumns} // Updated columns for financial reports
          dataSource={reports} // Updated data source for financial reports
          pagination={false} // Disable pagination
          scroll={{ y: 450, x: "max-content" }}
          bordered
        />
      </div>
    </div>
  );
}

export default Ledger;
