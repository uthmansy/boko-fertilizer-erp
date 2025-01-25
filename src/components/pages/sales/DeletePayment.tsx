import { Button, Modal } from "antd";
import useDeleteSalePayment from "../../../hooks/useDeleteSalePayment"; // Updated hook import
import { ExclamationCircleFilled } from "@ant-design/icons";
import { SalesPayments } from "../../../types/db";

interface Props {
  payment: SalesPayments; // Updated prop type
}

function DeletePayment({ payment }: Props) {
  // Renamed component and prop
  const { handleSubmit } = useDeleteSalePayment({ payment }); // Updated hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this payment?", // Updated title
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this payment will be deleted.", // Updated content
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
      <Button type="primary" danger onClick={showPromiseConfirm}>
        Delete
      </Button>
    </>
  );
}

export default DeletePayment; // Updated component name
