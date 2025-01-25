import { Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";
import { SalesAndPayments } from "../../../types/db";
import DeleteSale from "./DeleteSale";
import useAuthStore from "../../../store/auth";
import Record from "./Record";
import EditSale from "./EditSale";

interface Props {
  orderNumber: string;
  sale: SalesAndPayments;
}

function TableActions({ orderNumber, sale }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {(showAdminActions || userProfile?.role === "ACCOUNTING") && (
        <AddPayment orderNumber={orderNumber} />
      )}
      <ViewPayments sale={sale} orderNumber={orderNumber} />
      {showAdminActions && (
        <>
          <EditSale sale={sale} />
        </>
      )}
      <Record sale={sale} />
      {sale.quantity_taken === 0 && showAdminActions && (
        <DeleteSale sale={sale} />
      )}
    </Space>
  );
}

export default TableActions;
