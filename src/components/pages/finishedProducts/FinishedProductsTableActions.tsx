import { Space } from "antd";
import { FinishedProductsJoint } from "../../../types/db";
import EditFinishedProduct from "./EditFinishedProduct";
// import DeleteFinishedProduct from "./DeleteFinishedProduct";

interface Props {
  finishedProduct: FinishedProductsJoint;
}

function FinishedProductsTableActions({ finishedProduct }: Props) {
  return (
    <Space size="small">
      {/* <DeleteFinishedProduct finishedProduct={finishedProduct} /> */}
      <EditFinishedProduct product={finishedProduct} />
    </Space>
  );
}

export default FinishedProductsTableActions;
