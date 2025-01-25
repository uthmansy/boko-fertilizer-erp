import RefreshButton from "../../RefreshButton";
import { employeesKeys } from "../../../constants/QUERY_KEYS";
import AddNew from "./AddNew";
import AllEmployees from "./AllEmployees";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import { BorderInnerOutlined } from "@ant-design/icons";
import useCsv from "../../../hooks/useCsv";
import { Employees as EmployeesType } from "../../../types/db";
import { getAllEmployeesData } from "../../../helpers/apiFunctions";
import { Headers } from "react-csv/lib/core";

function Employees() {
  const headers: Headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Position", key: "position" },
    { label: "Department", key: "department" },
    { label: "Employment Status", key: "employment_status" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone_number" },
    { label: "Date Employed", key: "date_employed" },
    { label: "Salary", key: "salary" },
    { label: "Payroll Type", key: "payroll_type" },
    { label: "Bank Name", key: "bank_name" },
    { label: "Account Number", key: "bank_account_number" },
    { label: "Allowance", key: "allowance" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Date of Birth", key: "date_of_birth" },
    { label: "Emergency Contact", key: "emergency_contact_name" },
    { label: "Emergency Phone", key: "emergency_contact_phone" },
    { label: "Bonus", key: "bonus" },
  ];

  const { data } = useCsv<EmployeesType[]>({
    queryFn: getAllEmployeesData,
    queryKey: employeesKeys.getCsv,
  });
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={employeesKeys.getAllEmployees} />
        <AddNew />
        {data && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink filename={"Employees.csv"} data={data} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
        )}
      </div>
      <AllEmployees />
    </>
  );
}

export default Employees;
