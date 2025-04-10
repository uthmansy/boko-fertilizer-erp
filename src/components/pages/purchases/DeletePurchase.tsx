import { Button, Modal } from "antd";
import useDeletePurchase from "../../../hooks/useDeletePurchase"; // Create this hook similar to useDeleteRequest
import { PurchasesAndPayments } from "../../../types/db"; // Adjust type import according to your schema
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  purchase: PurchasesAndPayments;
}

function DeletePurchase({ purchase }: Props) {
  const { handleSubmit } = useDeletePurchase({ purchase });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this purchase?",
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this purchase will be deleted.",
      onOk: async () => {
        return new Promise((resolve) => {
          handleSubmit(resolve);
        }).catch(() => console.log("Oops, an error occurred!"));
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={showPromiseConfirm}
      />
    </>
  );
}

export default DeletePurchase;
