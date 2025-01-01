import { Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";
import { SalesAndPayments } from "../../../types/db";
import DeleteSale from "./DeleteSale";
import useAuthStore from "../../../store/auth";
import Record from "./Record";

interface Props {
  orderNumber: string;
  sale: SalesAndPayments;
}

function TableActions({ orderNumber, sale }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {(userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "ADMIN" ||
        userProfile?.role === "ACCOUNTING") && (
        <AddPayment orderNumber={orderNumber} />
      )}
      <ViewPayments sale={sale} orderNumber={orderNumber} />
      <Record sale={sale} />
      {sale.quantity_taken === 0 &&
        (userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN") && <DeleteSale sale={sale} />}
    </Space>
  );
}

export default TableActions;
