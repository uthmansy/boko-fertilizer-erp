import {
  Breadcrumb,
  Descriptions,
  Empty,
  Flex,
  Segmented,
  Space,
  Spin,
} from "antd";
import useExternalStockRecords from "../../../hooks/useExternalStockRecords";
import { useMediaQuery } from "react-responsive";
import { HomeOutlined } from "@ant-design/icons";

function ExternalStockRecords() {
  const { items, tableItems, handleItem, isLoading, records } =
    useExternalStockRecords();
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
