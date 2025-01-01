import { Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";
import Record from "./Record";
import { PurchasesAndPayments } from "../../../types/db";

interface Props {
  purchase: PurchasesAndPayments;
}

function TableActions({ purchase }: Props) {
  return (
    <Space size="small">
      <AddPayment orderNumber={purchase.order_number} />
      <ViewPayments orderNumber={purchase.order_number} />
      <Record purchase={purchase} />
    </Space>
  );
}

export default TableActions;
