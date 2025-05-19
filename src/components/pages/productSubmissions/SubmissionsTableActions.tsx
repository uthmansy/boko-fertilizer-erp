import { Space } from "antd";
import { ProductSubmission } from "../../../types/db"; // Replace with your actual type
import ApproveSubmission from "./ApproveSubmission"; // Replace with your actual component
import RejectSubmission from "./RejectSubmission"; // Replace with your actual component
import DeleteSubmission from "./DeleteSubmission"; // Replace with your actual component
import useAuthStore from "../../../store/auth";

interface Props {
  submission: ProductSubmission;
}

function SubmissionsTableActions({ submission }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {submission.status === "pending" && (
        <>
          {(userProfile?.role === "SUPER ADMIN" ||
            userProfile?.role === "INVENTORY") && (
            <>
              <ApproveSubmission submission={submission} />
              <RejectSubmission submission={submission} />
            </>
          )}
        </>
      )}
      {(userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "PRODUCTION") &&
        submission.status !== "accepted" && (
          <DeleteSubmission submission={submission} />
        )}
    </Space>
  );
}

export default SubmissionsTableActions;
