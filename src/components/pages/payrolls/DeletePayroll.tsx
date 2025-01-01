import { Button, Modal } from "antd";
import useDeletePayroll from "../../../hooks/useDeletePayroll"; // Assuming you'll create this hook similar to useDeleteRequest
import { Payrolls } from "../../../types/db"; // Assuming Payroll is the type for payroll data
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  payroll: Payrolls; // Adjust according to your payroll data structure
}

function DeletePayroll({ payroll }: Props) {
  const { handleSubmit } = useDeletePayroll({ payroll });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this payroll?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this payroll will be deleted.",
      onOk: async () => {
        return new Promise((resolve) => {
          handleSubmit(resolve);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <Button type="primary" danger onClick={showPromiseConfirm}>
        Delete
      </Button>
    </>
  );
}

export default DeletePayroll;
