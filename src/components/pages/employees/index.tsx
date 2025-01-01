import RefreshButton from "../../RefreshButton";
import { employeesKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllEmployees from "./AllEmployees";

function Employees() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={employeesKeys.getAllEmployees} />
        <AddNew />
      </div>
      <AllEmployees />
    </>
  );
}

export default Employees;
