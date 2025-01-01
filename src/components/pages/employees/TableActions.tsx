import { Space } from "antd";
import { Employees } from "../../../types/db";
import EditEmployee from "./EditEmployee";

interface Props {
  employee: Employees;
}

function TableActions({ employee }: Props) {
  return (
    <Space size="small">
      <EditEmployee employee={employee} />
    </Space>
  );
}

export default TableActions;
