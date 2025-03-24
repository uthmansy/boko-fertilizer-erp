import { Button, Modal, Tabs, TabsProps } from "antd";
import { useState } from "react";
import Deductions from "./Deductions";

interface Props {
  payrollId: string;
}
function ViewEmployeePayroll({ payrollId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Deductions",
      children: <Deductions payrollId={payrollId} />,
    },
  ];

  return (
    <>
      <Button onClick={handleOpenModal}>View</Button>
      <Modal
        footer={null}
        title="View Employee Payroll"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={960}
      >
        <Tabs size="small" defaultActiveKey="1" items={tabs} />
      </Modal>
    </>
  );
}

export default ViewEmployeePayroll;
