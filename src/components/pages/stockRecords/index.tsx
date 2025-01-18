import {
  Avatar,
  Breadcrumb,
  Button,
  Empty,
  Flex,
  Input,
  Segmented,
  Spin,
  Tabs,
} from "antd";
import { CiLocationOn } from "react-icons/ci";
import useStockRecords from "../../../hooks/useStockRecords";
import RefreshButton from "../../RefreshButton";
import { stocksKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";
import { HomeOutlined } from "@ant-design/icons";
import ProductionRecords from "./ProductionRecords";
import InventoryRecords from "./InventoryRecords";
import OverallRecords from "./OverallRecords";

function StockRecords() {
  const {
    items,
    warehouses,
    handleItem,
    handleWarehouse,
    isLoading,
    record,
    handleItemSearch,
    resetFilters,
  } = useStockRecords();

  const { userProfile } = useAuthStore();

  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Stock Records</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={stocksKeys.getItemRecord} />
        <Button onClick={resetFilters}>Reset Filters</Button>
        <Input
          className="w-56"
          onPressEnter={handleItemSearch}
          placeholder="Search by Name and hit enter"
          allowClear
        />
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
          <>
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
          </>
        )}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spin />
        </div>
      ) : record ? (
        <Tabs
          defaultActiveKey="overall"
          tabPosition="top"
          items={[
            {
              label: `OVERALL`,
              key: "overall",
              children: <OverallRecords record={record} />,
            },
            {
              label: `INVENTORY`,
              key: "inventory",
              children: <InventoryRecords record={record} />,
            },
            {
              label: `PRODUCTION`,
              key: "production",
              children: <ProductionRecords record={record} />,
            },
          ]}
        />
      ) : (
        // <Descriptions
        //   title={`Stock Record for ${record.item} in ${record.warehouse}`}
        //   layout="horizontal"
        //   bordered
        //   items={tableItems}
        //   column={1}
        // />
        <Empty />
      )}
    </>
  );
}

export default StockRecords;
