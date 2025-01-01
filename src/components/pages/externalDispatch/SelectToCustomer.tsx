import { Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";

function SelectToCustomer() {
  const { nextPage, setToCustomer } = useDispatchStore();

  const handleToCustomer = () => {
    setToCustomer(true);
    nextPage();
  };
  const handleToWarehouse = () => {
    setToCustomer(false);
    nextPage();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Space>
        <Button size="large" onClick={handleToCustomer}>
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
