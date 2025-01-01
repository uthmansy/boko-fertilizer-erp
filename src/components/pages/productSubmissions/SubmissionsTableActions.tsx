import { Space } from "antd";
import { ProductSubmission } from "../../../types/db"; // Replace with your actual type
import ApproveSubmission from "./ApproveSubmission"; // Replace with your actual component
import RejectSubmission from "./RejectSubmission"; // Replace with your actual component
import DeleteSubmission from "./DeleteSubmission"; // Replace with your actual component

interface Props {
  submission: ProductSubmission;
}

function SubmissionsTableActions({ submission }: Props) {
  return (
    <Space size="small">
      {submission.status === "pending" && (
        <>
          <ApproveSubmission submission={submission} />
          <RejectSubmission submission={submission} />
          <DeleteSubmission submission={submission} />
        </>
      )}
    </Space>
  );
}

export default SubmissionsTableActions;
