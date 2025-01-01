import { Button, Modal } from "antd";
import useDeleteProduction from "../../../hooks/useDeleteProduction"; // Assuming you'll create this hook similar to useDeleteRequest
import { ProductionWithItems } from "../../../types/db"; // Replace with your actual type for production
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  production: ProductionWithItems; // Replace with your actual type for production
}

function DeleteProduction({ production }: Props) {
  const { handleSubmit } = useDeleteProduction({ production });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this production run?",
      icon: <ExclamationCircleFilled />,
      content:
        "When clicked the OK button, this production run will be deleted.",
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
      <Button type="primary" danger onClick={showPromiseConfirm}>
        Delete
      </Button>
    </>
  );
}

export default DeleteProduction;
