import { formatNumber } from "../../../helpers/functions";
import { Tag } from "antd";
import useDarkMode from "../../../store/theme";
import clsx from "clsx";
import useFinancialReports from "../../../hooks/useFinancialReports";
import { MONTHS } from "../../../constants/ENUMS";

export default function LedgerList() {
  const { sortedDescendingReports, isLoading, isError } = useFinancialReports();

  const { darkMode } = useDarkMode();

  if (isLoading) {
    return (
      <div
        className={clsx(
          "px-8 py-14 rounded-lg shadow animate-pulse",
          "bg-white dark:bg-zinc-300"
        )}
      >
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-[var(--ant-color-error)] bg-[var(--ant-color-bg-container)]">
        Something went wrong fetching sales.
      </div>
    );
  }

  if (!sortedDescendingReports?.length) {
    return (
      <div className="p-6 text-[var(--ant-color-text-tertiary)] bg-[var(--ant-color-bg-container)]">
        No recent Data found.
      </div>
    );
  }

  return (
    <section
      className={`space-y-4 px-8 py-14 rounded-lg shadow-[var(--ant-box-shadow)] ${
        darkMode ? "bg-neutral-800" : "bg-neutral-100"
      } `}
    >
      <h2 className="text-base font-bold uppercase tracking-wide text-[var(--ant-color-text-secondary)] flex items-center justify-between">
        <span> Monthy Profit/Loss</span>
        <span>
          <Tag color="lime">All Months</Tag>
        </span>
      </h2>
      <ul className={`divide-y ${darkMode ? "divide-neutral-700" : ""}`}>
        {sortedDescendingReports.map((report) => (
          <li
            key={`${report.month}${report.year}`}
            className="flex items-center justify-between p-4 hover:bg-[var(--ant-color-item-hover-bg)] transition-colors"
          >
            <div>
              <p className="font-semibold text-lg text-[var(--ant-color-text)] uppercase">
                {report.month && MONTHS[report.month - 1]} / {report.year}
              </p>
              <p className="text-[var(--ant-color-text-tertiary)]">
                Total Revenue: ₦{formatNumber(report.total_revenue || 0)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className=" text-[var(--ant-color-text)] text-lg">
                ₦{formatNumber(report.profit ?? 0)}
              </span>
              {report.profit && report.profit > 0 ? (
                <Tag color="green-inverse">Profit</Tag>
              ) : report.profit && report.profit < 0 ? (
                <Tag color="red-inverse">Loss</Tag>
              ) : (
                <Tag>Break Even</Tag>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
