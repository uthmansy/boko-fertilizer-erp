import { Button, Modal } from "antd";
import useMarkUsed from "../../../hooks/useMarkUsed";
import { RequestWithItems } from "../../../types/db";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  request: RequestWithItems;
}

function MarkUsed({ request }: Props) {
  const { handleSubmit } = useMarkUsed({ request });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to mark as used?",
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
      <Button onClick={showPromiseConfirm}>Mark as Used</Button>
    </>
  );
}

export default MarkUsed;
