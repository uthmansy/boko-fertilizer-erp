import { Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";

function SelectType() {
  const { nextPage, setDispatchType } = useDispatchStore();

  const handleSale = () => {
    setDispatchType("sale");
    nextPage();
  };
  const handleTransfer = () => {
    setDispatchType("transfer");
    nextPage();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Space>
        <Button size="large" onClick={handleSale}>
          Sale
        </Button>{" "}
        /{" "}
        <Button size="large" onClick={handleTransfer}>
          Transfer
        </Button>
      </Space>
    </div>
  );
}

export default SelectType;
