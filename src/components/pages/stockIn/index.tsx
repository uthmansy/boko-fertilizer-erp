import RefreshButton from "../../RefreshButton";
import { stockInKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllStockIns from "./AllStockIns";
import useAuthStore from "../../../store/auth";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function StockIn() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Stock In</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={stockInKeys.getAll} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "INVENTORY") && <AddNew />}
      </div>
      <AllStockIns />
    </>
  );
}

export default StockIn;
