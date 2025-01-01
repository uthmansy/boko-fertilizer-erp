import { Button, Modal } from "antd";
import useDeleteExpense from "../../../hooks/useDeleteExpense"; // Assuming you'll create this hook similar to useDeleteRequest
import { Expenses } from "../../../types/db"; // Adjust this according to your expense data structure
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  expense: Expenses; // Adjust according to your expense data structure
}

function DeleteExpense({ expense }: Props) {
  const { handleSubmit } = useDeleteExpense({ expense });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this expense?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this expense will be deleted.",
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

export default DeleteExpense;
