import RefreshButton from "../../RefreshButton";
import { positionsKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is updated for positions
import AllPositions from "./AllPositions"; // Renamed component for displaying all positions
import useAuthStore from "../../../store/auth";

function Positions() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={positionsKeys.getPositions} />{" "}
        {/* Updated query key */}
        {(userProfile?.role === "ADMIN" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllPositions /> {/* Updated component */}
    </>
  );
}

export default Positions;
