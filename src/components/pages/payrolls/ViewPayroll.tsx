import { Button, Modal, Space, Table, Tag } from "antd";
import useViewPayroll from "../../../hooks/useViewPayroll"; // Use the appropriate hook for payroll
import { EmployeePayrollJoined, PayrollsAndEmployees } from "../../../types/db";
import { formatNumber, getMonthName } from "../../../helpers/functions";
import { employeePayrollAdminColumns } from "../../../tableColumns/employeePayrolls";
import PayPayroll from "./PayPayroll";
import PrintPayroll from "./PrintPayroll";
import useAuthStore from "../../../store/auth";
import useFilters from "../../../hooks/useFilters";
import Filters from "../../Filters";
import useCsv from "../../../hooks/useCsv";
import { Headers } from "react-csv/lib/core";
import { getPayrollEmployeesAll } from "../../../helpers/apiFunctions";
import { payrollKeys } from "../../../constants/QUERY_KEYS";
import { CSVLink } from "react-csv";
import { BorderInnerOutlined } from "@ant-design/icons";

interface Props {
  payroll: PayrollsAndEmployees;
}

function ViewPayroll({ payroll }: Props) {
  const { debouncedSearchTerm, searchTerm, handleSearchChange, resetFilters } =
    useFilters();

  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    payroll: employeePayrolls,
  } = useViewPayroll({
    payrollId: payroll.id,
    debouncedSearchTerm,
  }); // Use the payroll hook

  const { userProfile } = useAuthStore();
  const { data } = useCsv<EmployeePayrollJoined[]>({
    queryFn: () => getPayrollEmployeesAll({ payrollId: payroll.id }),
    queryKey: payrollKeys.getPayrollEmployeesAll,
  });

  const flatData = data
    ?.map((payroll) => ({
      ...payroll,
      name: `${payroll.employee.first_name} ${payroll.employee.last_name}`,
      bank: payroll.employee.bank_name,
      acc_number: payroll.employee.bank_account_number,
      bank_name: payroll.employee.bank_name,
    }))
    ?.sort((a, b) => a.name.localeCompare(b.name));

  const headers: Headers = [
    { label: "Name", key: "name" },
    { label: "Type", key: "payroll_type" },
    { label: "Gross Pay", key: "to_be_paid" },
    { label: "Net Pay", key: "net_pay" },
    { label: "Bank", key: "bank" },
    { label: "Account Number", key: "acc_number" },
    { label: "Bank Name", key: "bank_name" },
    { label: "Note", key: "note" },
  ];

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        View
      </Button>
      <Modal
        footer={null}
        title="View Payroll"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={1000}
      >
        <div className="mb-5">
          <Space>
            <Tag color="geekblue-inverse">
              Total Due: ₦{formatNumber(payroll.total_paid)}
            </Tag>
            <Tag
              color={
                payroll.status === "paid" ? "green-inverse" : "red-inverse"
              }
            >
              Status: {payroll.status}
            </Tag>
            <Tag>Month: {getMonthName(payroll.month)}</Tag>
            <Tag>Year: {payroll.year}</Tag>
          </Space>
        </div>
        <div className="mb-5">
          <Space className="mb-5">
            {payroll.status === "pending" &&
              (userProfile?.role === "ADMIN" ||
                userProfile?.role === "SUPER ADMIN" ||
                userProfile?.role === "ACCOUNTING") && (
                <PayPayroll payroll={payroll} />
              )}
            {payroll.status === "paid" && (
              <PrintPayroll data={data} payroll={payroll} />
            )}
            {flatData && (
              <Button icon={<BorderInnerOutlined />}>
                <CSVLink
                  filename={`payroll-${payroll.month}-${payroll.year}.csv`}
                  data={flatData}
                  headers={headers}
                >
                  Export to CSV
                </CSVLink>
              </Button>
            )}
          </Space>
          <Filters
            onSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            onReset={resetFilters}
          />
        </div>
        <Table
          size="small"
          loading={isLoading || isFetchingNextPage || isRefetching}
          columns={employeePayrollAdminColumns} // Use payroll columns
          dataSource={employeePayrolls}
          pagination={false} // Disable pagination
          scroll={{ y: 450, x: "max-content" }}
          bordered
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            if (
              Math.round(target.scrollHeight - target.scrollTop) ===
              target.clientHeight
            ) {
              fetchNextPage();
            }
          }}
        />
      </Modal>
    </>
  );
}

export default ViewPayroll;
