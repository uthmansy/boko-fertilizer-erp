import RefreshButton from "../../RefreshButton";
import { finishedProductsKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllFinishedProducts from "./AllFinishedProducts";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
// import AllItems from "./AllItems";

function FinishedProducts() {
  return (
    <>
      {" "}
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
                <span className="uppercase">Daily Finished Products</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={finishedProductsKeys.getAll} />
        <AddNew />
      </div>
      <AllFinishedProducts />
    </>
  );
}

export default FinishedProducts;
