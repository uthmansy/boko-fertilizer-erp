import { Button, Modal } from "antd";
import useDeleteBonus from "../../../hooks/useDeleteBonus"; // Updated hook import
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  id: string; // Updated prop type
}

function DeleteBonus({ id }: Props) {
  // Renamed component and prop
  const { handleSubmit } = useDeleteBonus({ id }); // Updated hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this bonus?", // Updated title
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this bonus will be deleted.", // Updated content
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

export default DeleteBonus; // Updated component name
