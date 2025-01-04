import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import useFinancialReports from "../../../hooks/useFinancialReports";

const FinancialReportChart = () => {
  const { reports } = useFinancialReports();

  return (
    <div className="py-20 grid grid-cols-2 gap-10">
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
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={reports}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year_month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total_sales"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="profit"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialReportChart;
