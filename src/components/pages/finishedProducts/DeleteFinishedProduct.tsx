import { Button, Modal } from "antd";
import useDeleteFinishedProduct from "../../../hooks/useDeleteFinishedProduct"; // Assuming you'll create this hook similar to useDeleteRequest
import { FinishedProductsJoint } from "../../../types/db"; // Replace with your actual type for production
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  finishedProduct: FinishedProductsJoint; // Replace with your actual type for production
}

function DeleteFinishedProduct({ finishedProduct }: Props) {
  const { handleSubmit } = useDeleteFinishedProduct({ finishedProduct });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this record?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this record will be deleted.",
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

export default DeleteFinishedProduct;
