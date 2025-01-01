import { Button, Modal } from "antd";
import useApproveRequest from "../../../hooks/useApproveRequest";
import { RequestWithItems } from "../../../types/db";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  request: RequestWithItems;
}

function ApproveRequest({ request }: Props) {
  const { handleSubmit } = useApproveRequest({ request });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
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
      <Button type="primary" onClick={showPromiseConfirm}>
        Approve
      </Button>
    </>
  );
}

export default ApproveRequest;
