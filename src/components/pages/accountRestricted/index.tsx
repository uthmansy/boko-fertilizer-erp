import { Result, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AccountRestricted() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login"); // Adjust the path if your login route is different
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        icon={<LockOutlined style={{ color: "#ff4d4f", fontSize: "64px" }} />}
        status="error"
        title="Account Restricted"
        subTitle="Your account has been restricted by the admin. Please contact admin."
        extra={
          <Button type="primary" onClick={handleGoToLogin}>
            Back to Login
          </Button>
        }
        className="p-8 bg-white shadow-md rounded-lg"
      />
    </div>
  );
}

export default AccountRestricted;
