import { purchasesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllPurchases from "./AllPurchases";

function Purchases() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={purchasesKeys.getAllPurchases} />
        <AddNew />
      </div>
      <AllPurchases />
    </>
  );
}

export default Purchases;
