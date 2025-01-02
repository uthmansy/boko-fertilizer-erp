import { HomeOutlined } from "@ant-design/icons";
import { userKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import RefreshButton from "../../RefreshButton";
import AllUsers from "./AllUsers"; // Renamed component for displaying all users
import { Breadcrumb } from "antd";

function UserManagement() {
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
                <span className="uppercase">User Management</span>
              </>
            ),
          },
        ]}
      />
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={userKeys.getUsers} />
      </div>
      <AllUsers />
    </>
  );
}

export default UserManagement;
