import React from "react";
import clsx from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  subtitle?: string;
  trend?: "up" | "down";
  highlight?: boolean;
  isLoading?: boolean;
  // Color customization props
  normalBackground?: string;
  highlightBackground?: string;
  titleColor?: string;
  valueColor?: string;
  trendUpColor?: string;
  trendDownColor?: string;
  iconColor?: string;
  // Custom class names
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  subtitleClassName?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  highlight = false,
  isLoading = false,
  // Color defaults with dark mode support
  normalBackground = "bg-white dark:bg-zinc-800",
  highlightBackground = "bg-blue-50 dark:bg-blue-900/20",
  titleColor = "text-zinc-500 dark:text-zinc-400",
  valueColor = "text-zinc-900 dark:text-zinc-100",
  trendUpColor = "text-green-600 dark:text-green-400",
  trendDownColor = "text-red-600 dark:text-red-400",
  iconColor = "text-zinc-400 dark:text-zinc-500",
  // Class names
  className = "",
  titleClassName = "",
  valueClassName = "",
  subtitleClassName = "",
  iconClassName = "",
}) => {
  if (isLoading) {
    return (
      <div
        className={clsx(
          "p-4 rounded-lg shadow animate-pulse",
          normalBackground,
          className
        )}
      >
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "p-4 rounded-lg shadow transition-colors",
        highlight ? highlightBackground : normalBackground,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={clsx("text-sm", titleColor, titleClassName)}>
            {title}
          </div>
          <div
            className={clsx("text-2xl font-bold", valueColor, valueClassName)}
          >
            {value}
          </div>
          {subtitle && (
            <div className={clsx("mt-1 flex items-center", subtitleClassName)}>
              {trend === "up" && (
                <span className={`${trendUpColor} mr-1`}>&#x2191;</span>
              )}
              {trend === "down" && (
                <span className={`${trendDownColor} mr-1`}>&#x2193;</span>
              )}
              <span
                className={
                  trend === "up"
                    ? trendUpColor
                    : trend === "down"
                    ? trendDownColor
                    : "text-zinc-500 dark:text-zinc-400"
                }
              >
                {subtitle}
              </span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={clsx(iconColor, iconClassName)}>
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
