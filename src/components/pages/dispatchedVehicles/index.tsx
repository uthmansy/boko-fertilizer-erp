import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllDispatchedVehicles from "./AllDispatchedVehicles";

function DispatchedVehicles() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getDispatchedVehicles} />
      </div>
      <AllDispatchedVehicles />
    </>
  );
}

export default DispatchedVehicles;
