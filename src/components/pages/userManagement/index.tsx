import { userKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import RefreshButton from "../../RefreshButton";
import AllUsers from "./AllUsers"; // Renamed component for displaying all users

function UserManagement() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={userKeys.getUsers} />
      </div>
      <AllUsers />
    </>
  );
}

export default UserManagement;
