import { Button, Modal } from "antd";
import useRestrictUser from "../../../hooks/useRestrictUser"; // Assuming you'll create this hook similar to useApproveExpense
import { UserProfile } from "../../../types/db"; // Adjust this to match the type for user data
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  user: UserProfile;
  restrict: boolean;
}

function RestrictUser({ user, restrict }: Props) {
  const { handleSubmit } = useRestrictUser({ user, restrict });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to restrict this user?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this user will be restricted.",
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
      <Button type="primary" danger={restrict} onClick={showPromiseConfirm}>
        {restrict ? "Restrict Access" : "Allow Access"}
      </Button>
    </>
  );
}

export default RestrictUser;
