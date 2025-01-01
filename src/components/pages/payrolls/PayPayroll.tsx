import { Button, Modal } from "antd";
import usePayPayroll from "../../../hooks/usePayPayroll"; // Assuming you'll create this hook
import { Payrolls } from "../../../types/db"; // Assuming Payroll is the type for payroll data
import { ExclamationCircleFilled } from "@ant-design/icons";

interface Props {
  payroll: Payrolls;
}

function PayPayroll({ payroll }: Props) {
  const { handleSubmit } = usePayPayroll({ payroll });

  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to pay this payroll?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, this payroll will be processed.",
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
        Pay Payroll
      </Button>
    </>
  );
}

export default PayPayroll;
