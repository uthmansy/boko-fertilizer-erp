import { Button, Modal } from "antd";
import useRejectSubmission from "../../../hooks/useRejectSubmission"; // Update hook import
import { ProductSubmission } from "../../../types/db"; // Update type import
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  submission: ProductSubmission; // Update prop type
}

function RejectSubmission({ submission }: Props) {
  const { handleSubmit } = useRejectSubmission({ submission }); // Update hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to reject this submission?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this submission will be rejected.",
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

export default RejectSubmission;
