import { FC, ReactNode } from "react";
import clsx from "clsx";

interface MetricCardProps {
  /** Icon to display (e.g., from lucide-react or any other icon library) */
  icon: ReactNode;
  /** Main number or amount to display, formatted as a string or number */
  amount: string | number;
  /** Label below the amount */
  label: string;
  /** Percentage change value, include sign (e.g., '+65%' or '-12%') */
  changePercent: string;
  /** Optional flag to invert color styling for positive or negative change */
  positive?: boolean;
  bgClass?: string;
  iconBgClass?: string;
  loading?: boolean;
}

const MetricCard: FC<MetricCardProps> = ({
  icon,
  amount,
  label,
  loading = false,
  // changePercent,
  // positive = true,
  bgClass = "bg-primary/20",
  iconBgClass = "bg-primary",
}) => {
  // Determine badge styling based on positive/negative change
  // const badgeBg = positive
  //   ? "bg-green-100 text-green-800"
  //   : "bg-red-100 text-red-800";
  // const changeSign = positive ? "+" : "-";

  if (loading) {
    return (
      <div
        className={clsx(
          "rounded-xl shadow-sm p-8  w-full transition-transform animate-pulse",
          "bg-white dark:bg-zinc-300"
        )}
      >
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-8 bg-zinc-300 dark:bg-zinc-200 rounded w-2/3 mb-7"></div>
      </div>
    );
  }

  return (
    <div
      className={`${bgClass} rounded-xl shadow-sm p-8 flex flex-col space-y-5  w-full transition-transform`}
    >
      {/* Top section: Icon + Amount + Label */}
      <div className="flex flex-col">
        <div
          className={`${iconBgClass} text-white rounded-xl h-20 w-20 flex items-center justify-center mb-3`}
        >
          {icon}
        </div>
        <div className="text-xl font-bold text-gray-900">
          {typeof amount === "number" ? `₦${amount.toLocaleString()}` : amount}
        </div>
        <span className=" text-gray-500">{label}</span>
      </div>

      {/* Bottom section: Change indicator */}
      {/* <div
        className={`inline-flex items-center justify-center bg-white px-3 rounded-full text-sm font-medium w-fit`}
      >
        <span className="">{changeSign}</span>
        {changePercent}
      </div> */}
    </div>
  );
};

export default MetricCard;
