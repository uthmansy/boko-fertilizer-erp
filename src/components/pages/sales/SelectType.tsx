import { Button, Space } from "antd";
import useSalesStore from "../../../store/sales";

function SelectType() {
  const { nextPage, setType } = useSalesStore(); // Adjust method names if needed

  const handleInternal = () => {
    setType("internal");
    nextPage();
  };

  const handleExternal = () => {
    setType("external");
    nextPage();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Space>
        <Button size="large" onClick={handleInternal}>
          Internal
        </Button>{" "}
        /{" "}
        <Button size="large" onClick={handleExternal}>
          External
        </Button>
      </Space>
    </div>
  );
}

export default SelectType;
