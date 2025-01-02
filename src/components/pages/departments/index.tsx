import RefreshButton from "../../RefreshButton";
import { departmentsKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for departments
import AllDepartments from "./AllDepartments"; // Renamed component for displaying all departments
import useAuthStore from "../../../store/auth";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function Departments() {
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
                <span className="uppercase">Departments</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={departmentsKeys.getDepartments} />{" "}
        {/* Updated query key */}
        {(userProfile?.role === "ADMIN" ||
          userProfile?.role === "SUPER ADMIN") && <AddNew />}
      </div>
      <AllDepartments /> {/* Updated component */}
    </>
  );
}

export default Departments;
