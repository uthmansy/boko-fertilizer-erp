import { HomeOutlined } from "@ant-design/icons";
import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllDispatchedVehicles from "./AllDispatchedVehicles";
import { Breadcrumb } from "antd";

function DispatchedVehicles() {
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
                <span className="uppercase">Dispatched Vehicles</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getDispatchedVehicles} />
      </div>
      <AllDispatchedVehicles />
    </>
  );
}

export default DispatchedVehicles;
