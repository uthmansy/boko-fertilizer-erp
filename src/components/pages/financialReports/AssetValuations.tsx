import { Table } from "antd";
import useAssetValuations from "../../../hooks/useAssetValuations";
import { assetValuationColumns } from "../../../tableColumns/assetValuation";
import StatCard from "../../StatCard";
import { formatNumber } from "../../../helpers/functions";

function AssetValuations() {
  const {
    isLoading,
    stocks,
    allStocks,
    isLoadingAllStocks,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAssetValuations();

  const totalSum: number = allStocks.reduce((acc, stock) => {
    // Use nullish coalescing operator (??) to set null or undefined values to zero
    const balance = stock.balance ?? 0;
    const productionBalance = stock.production_balance ?? 0;
    return acc + balance + productionBalance;
  }, 0);

  const totalCostSum: number = allStocks.reduce((acc, stock) => {
    // Ensure balance and production_balance have a default value of 0 if null or undefined
    const balanceSum = (stock.balance ?? 0) + (stock.production_balance ?? 0);

    // Access item_info.purchase_cost and default to 0 if not present
    const purchaseCost = stock.item_info?.purchase_cost ?? 0;

    // Multiply the balance sum by purchase cost and add it to the accumulator
    return acc + balanceSum * purchaseCost;
  }, 0);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <StatCard
          isLoading={isLoadingAllStocks}
          title="Total Item Balance"
          value={formatNumber(totalSum)}
          subtitle="Sum of all units of items"
          //   trend="up"
          //   icon={IoArrowUpCircleOutline}
          //   highlight
          // Custom colors
          highlightBackground="bg-purple-50 dark:bg-purple-900"
          trendUpColor="text-purple-600 dark:text-purple-400"
          // Custom classes
          className="hover:scale-[1.02] transition-transform "
          titleClassName="font-semibold text-white"
          iconClassName="p-2 rounded-full bg-purple-100 dark:bg-purple-800/50"
        />
        <StatCard
          isLoading={isLoadingAllStocks}
          title="Total Asset Valuation"
          value={`₦${formatNumber(totalCostSum)}`}
          subtitle="Sum of all units of items purchase cost"
          //   trend="up"
          //   icon={IoArrowUpCircleOutline}
          //   highlight
          // Custom colors
          highlightBackground="bg-purple-50 dark:bg-purple-900"
          trendUpColor="text-purple-600 dark:text-purple-400"
          // Custom classes
          className="hover:scale-[1.02] transition-transform"
          titleClassName="font-semibold text-white"
          iconClassName="p-2 rounded-full bg-purple-100 dark:bg-purple-800/50"
        />
      </div>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={assetValuationColumns}
        dataSource={stocks}
        pagination={false} // Disable pagination
        scroll={{ y: 450, x: "max-content" }}
        bordered
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (
            Math.round(target.scrollHeight - target.scrollTop) ===
            target.clientHeight
          ) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default AssetValuations;
