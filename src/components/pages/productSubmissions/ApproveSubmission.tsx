import { Button, Modal } from "antd";
import useApproveSubmission from "../../../hooks/useApproveSubmission"; // Update the hook import
import { ProductSubmission } from "../../../types/db"; // Update the type import
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  submission: ProductSubmission; // Update the prop type
}

function ApproveSubmission({ submission }: Props) {
  const { handleSubmit } = useApproveSubmission({ submission }); // Update the hook usage

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to approve this submission?",
      icon: <ExclamationCircleFilled />,
      content: "This action will approve the product submission.",
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

export default ApproveSubmission;
