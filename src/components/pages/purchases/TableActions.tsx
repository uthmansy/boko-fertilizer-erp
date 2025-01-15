import { Button, Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";
import Record from "./Record";
import { PurchasesAndPayments } from "../../../types/db";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface Props {
  purchase: PurchasesAndPayments;
}

function TableActions({ purchase }: Props) {
  return (
    <Space size="small">
      <AddPayment orderNumber={purchase.order_number} />
      <ViewPayments orderNumber={purchase.order_number} />
      <Record purchase={purchase} />
      <Button type="primary" size="large">
        <MdModeEdit className="text-white" />
      </Button>
      <Button className="bg-red-600" size="large">
        <RiDeleteBin7Fill className="text-white text-xs" />
      </Button>
    </Space>
  );
}

export default TableActions;
