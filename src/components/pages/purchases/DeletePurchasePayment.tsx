import { Button, Modal } from "antd";
import useDeletePurchasePayment from "../../../hooks/useDeletePurchasePayment";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PurchasePayments } from "../../../types/db";

interface Props {
  purchasePayment: PurchasePayments;
}

function DeletePurchasePayment({ purchasePayment }: Props) {
  const { handleSubmit } = useDeletePurchasePayment({ purchasePayment });
  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this purchase payment?",
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this purchase payment will be deleted.",
      onOk: async () => {
        return new Promise((resolve) => {
          handleSubmit(resolve);
        }).catch(() => console.log("Oops, an error occurred!"));
      },
      onCancel: () => {},
    });
  };

  return (
    <Button type="primary" danger onClick={showPromiseConfirm}>
      Delete
    </Button>
  );
}

export default DeletePurchasePayment;
