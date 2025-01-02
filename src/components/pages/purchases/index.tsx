import { HomeOutlined } from "@ant-design/icons";
import { purchasesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllPurchases from "./AllPurchases";
import { Breadcrumb } from "antd";

function Purchases() {
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
                <span className="uppercase">Purchases</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={purchasesKeys.getAllPurchases} />
        <AddNew />
      </div>
      <AllPurchases />
    </>
  );
}

export default Purchases;
