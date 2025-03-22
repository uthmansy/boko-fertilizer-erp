import { Button, Modal, Space, Table, Tag } from "antd";
import useViewPayroll from "../../../hooks/useViewPayroll"; // Use the appropriate hook for payroll
import { PayrollsAndEmployees } from "../../../types/db";
import { formatNumber, getMonthName } from "../../../helpers/functions";
import { employeePayrollAdminColumns } from "../../../tableColumns/employeePayrolls";
import PayPayroll from "./PayPayroll";
import PrintPayroll from "./PrintPayroll";
import useAuthStore from "../../../store/auth";

interface Props {
  payroll: PayrollsAndEmployees;
}

function ViewPayroll({ payroll }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    payroll: employeePayrolls,
  } = useViewPayroll({ payrollId: payroll.id }); // Use the payroll hook

  const { userProfile } = useAuthStore();

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
            {payroll.status === "paid" && <PrintPayroll payroll={payroll} />}
          </Space>
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
