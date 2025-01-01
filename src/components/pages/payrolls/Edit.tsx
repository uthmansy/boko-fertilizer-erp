import { Button, Modal } from "antd";
import useEditEmployeePayroll from "../../../hooks/useEditEmployeePayroll"; // Adjust import to the payroll editing hook
import FormBuilder from "../../utils/FormBuilder";
import { EmployeePayrollAndEmployee } from "../../../types/db"; // Update to the correct type for payroll

interface Props {
  employeePayroll: EmployeePayrollAndEmployee; // Update prop type to Payroll
}

function Edit({ employeePayroll }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
  } = useEditEmployeePayroll({ employeePayroll }); // Use the payroll editing hook

  return (
    <>
      <Button onClick={handleOpenModal}>Edit</Button>
      <Modal
        footer={null}
        title="Edit Payroll"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
      >
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          columns={2}
        />
      </Modal>
    </>
  );
}

export default Edit;
