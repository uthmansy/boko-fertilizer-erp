import { Button, Modal } from "antd";
import usePrintPayroll from "../../../hooks/usePrintPayroll";
import DocumentViewer from "../../utils/DocumentViewer";
import Sample from "../../documents/sample";
import { PayrollsAndEmployees } from "../../../types/db";

interface Props {
  payroll: PayrollsAndEmployees;
}

function PrintPayroll({ payroll }: Props) {
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
        width={900}
      >
        <div className="flex space-x-5">
          <div className="w-1/2">
            <DocumentViewer fileName="payroll">
              <Sample />
            </DocumentViewer>
          </div>
          <div className="w-1/2">
            <DocumentViewer fileName="payroll">
              <Sample />
            </DocumentViewer>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PrintPayroll;
