import { formatNumber } from "../../../helpers/functions";
import useAllSales from "../../../hooks/useAllSales";
import { Tag } from "antd";
import useDarkMode from "../../../store/theme";
import clsx from "clsx";

export default function LatestSales() {
  const { isLoading, sales, isError } = useAllSales({
    dateFilter: "",
    debouncedSearchTerm: "",
    itemFilter: "",
    monthFilter: null,
    warehouseFilter: "",
    yearFilter: null,
  });

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

  if (!sales?.length) {
    return (
      <div className="p-6 text-[var(--ant-color-text-tertiary)] bg-[var(--ant-color-bg-container)]">
        No recent sales found.
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
        <span> Recent Sales</span>
        <span>
          <Tag color="lime">Last Five</Tag>
        </span>
      </h2>
      <ul className={`divide-y ${darkMode ? "divide-neutral-700" : ""}`}>
        {sales.slice(0, 5).map((sale) => (
          <li
            key={sale.id}
            className="flex items-center justify-between p-4 hover:bg-[var(--ant-color-item-hover-bg)] transition-colors"
          >
            <div>
              <p className="font-semibold text-lg text-[var(--ant-color-text)]">
                {sale.customer_info.name}
              </p>
              <p className="text-[var(--ant-color-text-tertiary)]">
                {sale.order_number}
              </p>
            </div>
            <span className=" text-[var(--ant-color-text)] text-lg">
              ₦{formatNumber(sale.amount ?? 0)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
