import {
  Breadcrumb,
  Button,
  Descriptions,
  Empty,
  Flex,
  Input,
  Segmented,
  Space,
  Spin,
} from "antd";
import useExternalStockRecords from "../../../hooks/useExternalStockRecords";
import { useMediaQuery } from "react-responsive";
import { HomeOutlined } from "@ant-design/icons";
import RefreshButton from "../../RefreshButton";
import { externalStocksKeys } from "../../../constants/QUERY_KEYS";

function ExternalStockRecords() {
  const {
    items,
    tableItems,
    handleItem,
    isLoading,
    records,
    handleItemSearch,
    resetFilters,
  } = useExternalStockRecords();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

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
                <span className="uppercase">External Stock Records</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={externalStocksKeys.getExternalStockRecords} />
        <Button onClick={resetFilters}>Reset Filters</Button>
        <Input
          className="w-56"
          onPressEnter={handleItemSearch}
          placeholder="Search by Name and hit enter"
          allowClear
        />
      </div>
      <div className="mb-10">
        <Flex
          gap="small"
          align="flex-start"
          vertical
          wrap
          className="max-w-max overflow-x-auto"
        >
          {items && items.length > 0 && (
            <Segmented
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
          )}
        </Flex>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spin />
        </div>
      ) : records && records.length != 0 ? (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          {tableItems.map((item, index) => (
            <Descriptions
              layout="horizontal"
              bordered
              key={index}
              items={item}
              column={isMobile ? 1 : 2}
            />
          ))}
        </Space>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default ExternalStockRecords;
