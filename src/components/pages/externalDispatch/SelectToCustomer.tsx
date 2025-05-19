import { Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";

function SelectToCustomer() {
  const { nextPage, setDispatchType } = useDispatchStore();

  const handleSale = () => {
    setDispatchType("sale");
    nextPage();
  };
  const handleToWarehouse = () => {
    setDispatchType("purchase");
    nextPage();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Space>
        <Button size="large" onClick={handleSale}>
          To Customer
        </Button>{" "}
        /{" "}
        <Button size="large" onClick={handleToWarehouse}>
          To Warehouse
        </Button>
      </Space>
    </div>
  );
}

export default SelectToCustomer;
