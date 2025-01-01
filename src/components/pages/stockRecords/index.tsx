import { Avatar, Descriptions, Empty, Flex, Segmented, Spin } from "antd";
import { CiLocationOn } from "react-icons/ci";
import useStockRecords from "../../../hooks/useStockRecords";
import RefreshButton from "../../RefreshButton";
import { stocksKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";

function StockRecords() {
  const {
    items,
    warehouses,
    tableItems,
    handleItem,
    handleWarehouse,
    isLoading,
    record,
  } = useStockRecords();

  const { userProfile } = useAuthStore();

  return (
    <>
      <div className="mb-2">
        <RefreshButton queryKey={stocksKeys.getItemRecord} />
      </div>
      <div className="mb-10">
        {warehouses &&
          warehouses.length > 0 &&
          (userProfile?.role === "SUPER ADMIN" ||
            userProfile?.role === "ADMIN") && (
            <Flex
              gap="small"
              align="flex-start"
              vertical
              className="max-w-max overflow-x-auto"
            >
              <Segmented
                className="mb-2"
                size="large"
                defaultValue={userProfile?.warehouse || warehouses[0]}
                options={warehouses.map((warehouse) => ({
                  label: (
                    <div style={{ padding: 4 }}>
                      <Avatar
                        style={{
                          backgroundColor: "#ffffff",
                        }}
                        icon={<CiLocationOn />}
                      />
                      <div className="capitalize">{warehouse}</div>
                    </div>
                  ),
                  value: warehouse,
                }))}
                onChange={(value) => handleWarehouse(value)}
              />
            </Flex>
          )}
        {items && items.length > 0 && (
          <Flex
            gap="small"
            align="flex-start"
            vertical
            className="max-w-max overflow-x-auto"
          >
            <Segmented
              size="large"
              defaultValue={items[0]}
              options={items.map((item) => ({
                label: (
                  <div style={{ padding: 4 }}>
                    <div className="uppercase">{item}</div>
                  </div>
                ),
                value: item,
              }))}
              onChange={(value) => handleItem(value)}
            />
          </Flex>
        )}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spin />
        </div>
      ) : record ? (
        <Descriptions
          title={`Stock Record for ${record.item} in ${record.warehouse}`}
          layout="horizontal"
          bordered
          items={tableItems}
          column={1}
        />
      ) : (
        <Empty />
      )}
    </>
  );
}

export default StockRecords;
