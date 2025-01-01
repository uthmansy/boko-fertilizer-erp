import { Button, Modal } from "antd";
import useDeleteSale from "../../../hooks/useDeleteSale"; // Create this hook similar to useDeleteRequest
import { Sales } from "../../../types/db"; // Adjust type import according to your schema
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  sale: Sales; // Adjust according to your type for sales
}

function DeleteSale({ sale }: Props) {
  const { handleSubmit } = useDeleteSale({ sale });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this sale?",
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this sale will be deleted.",
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

export default DeleteSale;
