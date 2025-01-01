import { Button, Modal } from "antd";
import useRejectRequest from "../../../hooks/useRejectRequest"; // Assuming you'll create this hook similar to useApproveRequest
import { RequestWithItems } from "../../../types/db";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  request: RequestWithItems;
}

function RejectRequest({ request }: Props) {
  const { handleSubmit } = useRejectRequest({ request });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to reject this request?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this request will be rejected.",
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
        Reject
      </Button>
    </>
  );
}

export default RejectRequest;
