import MetricCard from "../../MetricCard";
import {
  BarChartOutlined,
  DollarOutlined,
  HomeOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import FinancialReportChart from "./FinancialReportChart";
import LatestSales from "./LatestSales";
import BarCharts from "./BarCharts";
import UserList from "./UserList";
import useFinancialReports from "../../../hooks/useFinancialReports";
import { formatNumber } from "../../../helpers/functions";

function Analytics() {
  const { sortedDescendingReports, isLoading } = useFinancialReports();

  return (
    <div className="mt-5 grid grid-cols-4 lg:grid-cols-6 gap-5">
      <div className="grid h-fit grid-cols-2 md:grid-cols-4 gap-5 col-span-4">
        <MetricCard
          amount={
            "₦" + formatNumber(sortedDescendingReports[0]?.total_revenue || 0)
          }
          label="Total Revenue"
          icon={<HomeOutlined className="text-white text-3xl" />}
          changePercent="20"
          bgClass="bg-indigo-50"
          iconBgClass="bg-indigo-500"
          loading={isLoading}
        />
        <MetricCard
          amount={
            "₦" +
            formatNumber(
              (sortedDescendingReports[0]?.total_expenses || 0) +
                (sortedDescendingReports[0]?.total_payroll || 0) +
                (sortedDescendingReports[0]?.transport_fees || 0)
            )
          }
          label="Total Expenses"
          icon={<PieChartOutlined className="text-white text-3xl" />}
          changePercent="20"
          bgClass="bg-amber-100"
          loading={isLoading}
          iconBgClass="bg-amber-500"
        />
        <MetricCard
          amount={"₦" + formatNumber(sortedDescendingReports[0]?.cogs || 0)}
          label="Cost of goods sold"
          icon={<BarChartOutlined className="text-white text-3xl" />}
          changePercent="20"
          bgClass="bg-rose-50"
          loading={isLoading}
          iconBgClass="bg-rose-400"
        />
        <MetricCard
          amount={"₦" + formatNumber(sortedDescendingReports[0]?.profit || 0)}
          label="Total Profit"
          icon={<DollarOutlined className="text-white text-3xl" />}
          changePercent="20"
          bgClass="bg-lime-50"
          loading={isLoading}
          iconBgClass="bg-lime-600"
        />
        <div className="col-span-2 md:col-span-4">
          <FinancialReportChart />
        </div>
      </div>
      <div className=" h-full col-span-4 lg:col-span-2 flex flex-col space-y-5">
        <LatestSales />
        <BarCharts />
        <UserList />
      </div>
    </div>
  );
}

export default Analytics;
