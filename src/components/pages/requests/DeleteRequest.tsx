import { Button, Modal } from "antd";
import useDeleteRequest from "../../../hooks/useDeleteRequest"; // Assuming you'll create this hook similar to useRejectRequest
import { RequestWithItems } from "../../../types/db";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  request: RequestWithItems;
}

function DeleteRequest({ request }: Props) {
  const { handleSubmit } = useDeleteRequest({ request });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this request?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this request will be deleted.",
      onOk: async () => {
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

export default DeleteRequest;
