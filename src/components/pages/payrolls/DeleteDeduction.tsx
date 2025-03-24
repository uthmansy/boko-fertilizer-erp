import { Button, Modal } from "antd";
import useDeleteDeduction from "../../../hooks/useDeleteDeduction"; // Updated hook import
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  id: string; // Updated prop type
}

function DeleteDeduction({ id }: Props) {
  // Renamed component and prop
  const { handleSubmit } = useDeleteDeduction({ id }); // Updated hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this deduction?", // Updated title
      icon: <ExclamationCircleFilled />,
      content: "When you click OK, this deduction will be deleted.", // Updated content
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

export default DeleteDeduction; // Updated component name
