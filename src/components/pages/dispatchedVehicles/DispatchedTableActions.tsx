import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ViewWaybill from "../../ViewWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
}

function DispatchedTableActions({ vehicle }: Props) {
  return (
    <Space size="small">
      <ViewWaybill vehicle={vehicle} type="dispatched" />
    </Space>
  );
}

export default DispatchedTableActions;
