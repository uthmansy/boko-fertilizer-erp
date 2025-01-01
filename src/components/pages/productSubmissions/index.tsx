import RefreshButton from "../../RefreshButton";
import { productSubmissionsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllProductSubmissions from "./AllProductSubmissions";
// import AllItems from "./AllItems";

function ProductSubmissions() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={productSubmissionsKeys.getAllSubmissions} />
        <AddNew />
      </div>
      <AllProductSubmissions />
    </>
  );
}

export default ProductSubmissions;
