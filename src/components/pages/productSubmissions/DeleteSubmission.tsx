import { Button, Modal } from "antd";
import useDeleteSubmission from "../../../hooks/useDeleteSubmission"; // Assuming you'll create this hook similar to useDeleteRequest
import { ProductSubmission } from "../../../types/db"; // Update the import for the type
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  submission: ProductSubmission; // Update to ProductSubmission type
}

function DeleteSubmission({ submission }: Props) {
  const { handleSubmit } = useDeleteSubmission({ submission });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete this submission?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this submission will be deleted.",
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

export default DeleteSubmission;
