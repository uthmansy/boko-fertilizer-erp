import { Space } from "antd";
import { ProductionWithItems } from "../../../types/db";
import DeleteProduction from "./DeleteProduction";

interface Props {
  production: ProductionWithItems;
}

function ProductionTableActions({ production }: Props) {
  return (
    <Space size="small">
      <DeleteProduction production={production} />
    </Space>
  );
}

export default ProductionTableActions;
