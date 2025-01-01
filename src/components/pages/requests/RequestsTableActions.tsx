import { Space } from "antd";
import { RequestWithItems } from "../../../types/db";
import ApproveRequest from "./ApproveRequest";
import RejectRequest from "./RejectRequest";
import DeleteRequest from "./DeleteRequest";

interface Props {
  request: RequestWithItems;
}

function RequestsTableActions({ request }: Props) {
  return (
    <Space size="small">
      {request.status === "pending" && (
        <>
          <ApproveRequest request={request} />
          <RejectRequest request={request} />
          <DeleteRequest request={request} />
        </>
      )}
    </Space>
  );
}

export default RequestsTableActions;
