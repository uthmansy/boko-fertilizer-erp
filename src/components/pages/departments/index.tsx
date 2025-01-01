import RefreshButton from "../../RefreshButton";
import { departmentsKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for departments
import AllDepartments from "./AllDepartments"; // Renamed component for displaying all departments
import useAuthStore from "../../../store/auth";

function Departments() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={departmentsKeys.getDepartments} />{" "}
        {/* Updated query key */}
        {(userProfile?.role === "ADMIN" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllDepartments /> {/* Updated component */}
    </>
  );
}

export default Departments;
