import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useDeletePurchaseItem from "../../../hooks/useDeletePurchaseItem";

interface Props {
  itemId: string; // Updated prop type
}

function DeleteItem({ itemId }: Props) {
  // Renamed component and prop
  const { handleSubmit } = useDeletePurchaseItem({ itemId }); // Updated hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this item?", // Updated title
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this item will be deleted.", // Updated content
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

export default DeleteItem; // Updated component name
