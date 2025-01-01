import RefreshButton from "../../RefreshButton";
import { payrollKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for payrolls
import AllPayrolls from "./AllPayrolls"; // Renamed component for displaying all payrolls
import useAuthStore from "../../../store/auth";

function Payrolls() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={payrollKeys.getPayrolls} />{" "}
        {/* Updated query key */}
        {(userProfile?.role === "ACCOUNTING" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllPayrolls /> {/* Updated component */}
    </>
  );
}

export default Payrolls;
