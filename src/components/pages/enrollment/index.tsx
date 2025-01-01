import RefreshButton from "../../RefreshButton";
import { enrollmentKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for enrollment
import AllEnrollment from "./AllEnrollment"; // Renamed component for displaying all enrollment

function Enrollment() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={enrollmentKeys.getEnrollments} />
        <AddNew />
      </div>
      <AllEnrollment /> {/* Updated component */}
    </>
  );
}

export default Enrollment;
