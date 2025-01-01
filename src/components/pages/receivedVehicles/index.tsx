import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllReceivedVehicles from "./AllReceivedVehicles";

function ReceivedVehicles() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getReceivedVehicles} />
      </div>
      <AllReceivedVehicles />
    </>
  );
}

export default ReceivedVehicles;
