import { Button, Modal } from "antd";
import usePrintPayroll from "../../../hooks/usePrintPayroll";
import DocumentViewer from "../../utils/DocumentViewer";
import { EmployeePayrollJoined, PayrollsAndEmployees } from "../../../types/db";
import SalaryRecord from "../../documents/SalaryRecord";

interface Props {
  payroll: PayrollsAndEmployees;
  data: EmployeePayrollJoined[] | undefined;
}

function PrintPayroll({ payroll, data }: Props) {
  const { handleCloseModal, handleOpenModal, isModalOpen } = usePrintPayroll();
  console.log(payroll);

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Print Payroll
      </Button>
      <Modal
        footer={null}
        title="Payroll"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={700}
      >
        <div className="flex space-x-5">
          {/* <div className="w-1/2">
            <DocumentViewer fileName="payroll">
              <Sample />
            </DocumentViewer>
          </div> */}
          <div className="w-full">
            {data && (
              <DocumentViewer fileName="payroll">
                <SalaryRecord data={data} payroll={payroll} />
              </DocumentViewer>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PrintPayroll;
