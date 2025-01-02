import RefreshButton from "../../RefreshButton";
import { payrollKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for payrolls
import AllPayrolls from "./AllPayrolls"; // Renamed component for displaying all payrolls
import useAuthStore from "../../../store/auth";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function Payrolls() {
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
                <span className="uppercase">Payrolls</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={payrollKeys.getPayrolls} />{" "}
        {/* Updated query key */}
        {(userProfile?.role === "ACCOUNTING" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllPayrolls /> {/* Updated component */}
    </>
  );
}

export default Payrolls;
