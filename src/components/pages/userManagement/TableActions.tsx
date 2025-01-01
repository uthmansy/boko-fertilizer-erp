import { Space } from "antd";
import { UserProfile } from "../../../types/db";
import RestrictUser from "./RestrictUser";
import EditUser from "./EditUser";

interface Props {
  user: UserProfile;
}

function TableActions({ user }: Props) {
  return (
    <Space size="small">
      <EditUser user={user} />
      {user.role !== "SUPER ADMIN" && (
        <RestrictUser restrict={!user.restricted} user={user} />
      )}
    </Space>
  );
}

export default TableActions;
