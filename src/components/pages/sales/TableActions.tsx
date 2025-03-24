import { Space } from "antd";
import { SalesAndPayments } from "../../../types/db";
import DeleteSale from "./DeleteSale";
import useAuthStore from "../../../store/auth";
import Record from "./Record";
import EditSale from "./EditSale";

interface Props {
  orderNumber: string;
  sale: SalesAndPayments;
}

function TableActions({ sale }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      {/* <ViewPayments sale={sale} orderNumber={orderNumber} /> */}
      {/* <ViewSaleItems saleId={sale.id} /> */}
      <Record sale={sale} />
      {showAdminActions && (
        <>
          <EditSale sale={sale} />
        </>
      )}
      <DeleteSale sale={sale} />
    </Space>
  );
}

export default TableActions;
