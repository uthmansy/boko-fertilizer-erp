import { Button, Modal } from "antd";
import useDeleteItem from "../../../hooks/useDeleteItem"; // Create this hook similar to useDeleteRequest
import { InventoryItems } from "../../../types/db"; // Adjust type import according to your schema
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  item: InventoryItems; // Adjust according to your type for sales
}

function DeleteItem({ item }: Props) {
  const { handleSubmit } = useDeleteItem({ item });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this item will be deleted.",
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

export default DeleteItem;
