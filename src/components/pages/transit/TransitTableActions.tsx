import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ReceiveVehicle from "./ReceiveVehicle";
import ViewWaybill from "../../ViewWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TransitTableActions({ vehicle }: Props) {
  return (
    <Space size="small">
      <ReceiveVehicle vehicle={vehicle} />
      <ViewWaybill type="transit" vehicle={vehicle} />
    </Space>
  );
}

export default TransitTableActions;
