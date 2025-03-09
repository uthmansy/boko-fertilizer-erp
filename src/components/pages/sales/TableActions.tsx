import { Space } from "antd";
import ViewPayments from "./ViewPayments";
import { SalesAndPayments } from "../../../types/db";
import DeleteSale from "./DeleteSale";
import useAuthStore from "../../../store/auth";
import Record from "./Record";
import EditSale from "./EditSale";
import ViewSaleItems from "./ViewSaleItems";

interface Props {
  orderNumber: string;
  sale: SalesAndPayments;
}

function TableActions({ orderNumber, sale }: Props) {
  const { userProfile } = useAuthStore();
  const showAdminActions = userProfile?.role === "SUPER ADMIN";
  return (
    <Space size="small">
      <ViewPayments sale={sale} orderNumber={orderNumber} />
      <ViewSaleItems saleId={sale.id} />
      {showAdminActions && (
        <>
          <EditSale sale={sale} />
        </>
      )}
      <Record sale={sale} />
      <DeleteSale sale={sale} />
    </Space>
  );
}

export default TableActions;
