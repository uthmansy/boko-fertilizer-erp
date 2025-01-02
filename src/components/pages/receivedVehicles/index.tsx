import { Breadcrumb } from "antd";
import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllReceivedVehicles from "./AllReceivedVehicles";
import { HomeOutlined } from "@ant-design/icons";

function ReceivedVehicles() {
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
                <span className="uppercase">Received Vehicles</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={vehiclesKeys.getReceivedVehicles} />
      </div>

      <AllReceivedVehicles />
    </>
  );
}

export default ReceivedVehicles;
