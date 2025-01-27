import RefreshButton from "../../RefreshButton";
import { expensesKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for expenses
import AllExpenses from "./AllExpenses"; // Renamed component for displaying all expenses
import useCsv from "../../../hooks/useCsv";
import { getTable } from "../../../helpers/apiFunctions";
import { Expenses as ExpensesType } from "../../../types/db";
import { Button } from "antd";
import { BorderInnerOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { Headers } from "react-csv/lib/core";

function Expenses() {
  const { data } = useCsv<ExpensesType[]>({
    queryFn: () => getTable<ExpensesType>("expenses"),
    queryKey: expensesKeys.getCsv,
  });

  const headers: Headers = [
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Beneficiary", key: "beneficiary" },
    { label: "Description", key: "description" },
    { label: "Invoice Number", key: "invoice_number" },
    { label: "Approved", key: "approved" },
    { label: "Approved By", key: "approved_by" },
    { label: "Payment Method", key: "payment_method" },
    { label: "Notes", key: "notes" },
  ];

  return (
    <div className="py-10">
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={expensesKeys.getExpenses} />
        {/* Updated query key */}
        <AddNew />
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink filename={"expenses.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllExpenses /> {/* Updated component */}
    </div>
  );
}

export default Expenses;
