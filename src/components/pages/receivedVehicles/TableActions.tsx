import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ViewWaybill from "../../ViewWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TableActions({ vehicle }: Props) {
  return (
    <Space size="small">
      <ViewWaybill vehicle={vehicle} type="received" />
    </Space>
  );
}

export default TableActions;
