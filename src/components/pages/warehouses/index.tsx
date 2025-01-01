import { warehousesKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllWarehouses from "./AllWarehouses";

function Warehouses() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={warehousesKeys.getAllWarehouses} />
        {(userProfile?.role === "ADMIN" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllWarehouses />
    </>
  );
}

export default Warehouses;
