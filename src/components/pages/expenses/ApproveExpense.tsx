import { Button, Modal } from "antd";
import useApproveExpense from "../../../hooks/useApproveExpense"; // Assuming you'll create this hook similar to useApproveRequest
import { Expenses } from "../../../types/db"; // Adjust this to match the type for expense data
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  expense: Expenses;
}

function ApproveExpense({ expense }: Props) {
  const { handleSubmit } = useApproveExpense({ expense });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to approve this expense?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this expense will be approved.",
      onOk: () => {
        return new Promise((resolve) => {
          handleSubmit(resolve);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <Button type="primary" onClick={showPromiseConfirm}>
        Approve
      </Button>
    </>
  );
}

export default ApproveExpense;
