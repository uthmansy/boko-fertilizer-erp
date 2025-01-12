import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ReceiveVehicle from "./ReceiveVehicle";
import ViewWaybill from "../../ViewWaybill";
import useAuthStore from "../../../store/auth";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TransitTableActions({ vehicle }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {(userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "INVENTORY") && (
        <ReceiveVehicle vehicle={vehicle} />
      )}
      <ViewWaybill type="transit" vehicle={vehicle} />
    </Space>
  );
}

export default TransitTableActions;
