import RefreshButton from "../../RefreshButton";
import { requestsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllRequests from "./AllRequests";
// import AllItems from "./AllItems";

function Requests() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={requestsKeys.getAllRequests} />
        <AddNew />
      </div>
      <AllRequests />
    </>
  );
}

export default Requests;
