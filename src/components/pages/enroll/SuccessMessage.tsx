import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function SuccessMessage() {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Account Created Successfully!"
      subTitle="Please check your email for the verification link. After verifying your account, you can log in."
      extra={[
        <Button type="primary" key="login" onClick={() => navigate("/login")}>
          Go to Login
        </Button>,
        <Button key="home" onClick={() => navigate("/")}>
          Back to Home
        </Button>,
      ]}
    />
  );
}

export default SuccessMessage;
