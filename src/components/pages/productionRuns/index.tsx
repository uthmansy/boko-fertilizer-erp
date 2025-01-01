import RefreshButton from "../../RefreshButton";
import { productionsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllProductions from "./AllProductions";
// import AllItems from "./AllItems";

function ProductionRuns() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={productionsKeys.getAllProductions} />
        <AddNew />
      </div>
      <AllProductions />
    </>
  );
}

export default ProductionRuns;
