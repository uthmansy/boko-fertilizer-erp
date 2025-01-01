import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllTransit from "./AllTransit";

function Transit() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getTransitVehicles} />
      </div>
      <AllTransit />
    </>
  );
}

export default Transit;
