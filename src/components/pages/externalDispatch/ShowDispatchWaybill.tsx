import { Empty, Spin } from "antd";
import useVehicle from "../../../hooks/useVehicle";
import TransitWaybill from "../transit/TransitWaybillViewer";
import { useEffect } from "react";
import TransitWaybillViewer from "../transit/TransitWaybillViewer";

interface Props {
  vehicleId: string;
  type: "customer" | "warehouse";
}

function ShowDispatchWaybill({ vehicleId, type }: Props) {
  const { isLoading, vehicle } = useVehicle({ vehicleId });
  useEffect(() => {
    console.log(vehicle);
    console.log(vehicle);
  }, [vehicle]);

  return isLoading ? (
    <div className="flex items-center justify-center h-96">
      <Spin />
    </div>
  ) : vehicle ? (
    type === "warehouse" ? (
      <TransitWaybill vehicle={vehicle} />
    ) : (
      <TransitWaybillViewer vehicle={vehicle} />
    )
  ) : (
    <Empty />
  );
}

export default ShowDispatchWaybill;
