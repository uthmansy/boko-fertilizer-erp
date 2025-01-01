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

const FinancialReportChart = () => {
  const { reports } = useFinancialReports();

  return (
    <div className="py-20">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={reports}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year_month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="total_purchases" stroke="#82ca9d" />
          <Line type="monotone" dataKey="profit" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialReportChart;
