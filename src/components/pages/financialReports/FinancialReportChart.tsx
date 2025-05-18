import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFinancialReports from "../../../hooks/useFinancialReports";
import LedgerList from "./LedgerList";

const FinancialReportChart = () => {
  const { sortedAscendingReports } = useFinancialReports();

  return (
    <div className="py-10">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedAscendingReports}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" allowDecimals />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="cogs" stroke="#82ca9d" />
          <Line type="monotone" dataKey="profit" stroke="#ff7300" />
          <Line type="monotone" dataKey="total_expenses" stroke="#aa75aa" />
        </LineChart>
      </ResponsiveContainer>
      <LedgerList />
    </div>
  );
};

export default FinancialReportChart;
