import { Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import FormBuilder from "../../utils/FormBuilder";
import { LOGO } from "../../../assets/images";
import useDarkMode from "../../../store/theme";

const Login = () => {
  const { formConfig, handleLogin, isLoading } = useLogin();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, colorBgSpotlight },
  } = theme.useToken();
  const { darkMode } = useDarkMode();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ background: darkMode ? colorBgContainer : "white" }}
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${LOGO})`,
          backgroundSize: "100%", // Adjust the size as needed
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.1, // Faint effect
        }}
      ></div>

      {/* Content */}
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-md p-8"
        style={{
          margin: "24px 16px",
          minHeight: 320,
          background: darkMode ? colorBgSpotlight : "white",
        }}
      >
        <h2 className="text-center mb-3 font-semibold">PORTAL LOGIN</h2>
        <div className="flex justify-center mb-6">
          <img
            src={LOGO}
            alt="Company Logo"
            className="h-auto w-48 border rounded-md" // Adjusted logo size
          />
        </div>
        <FormBuilder
          formConfig={formConfig}
          onSubmit={handleLogin}
          loading={isLoading}
          fullWidthButton={true}
        />
        <div className="mt-6 text-center">
          <Button
            size="large"
            className="w-full"
            type="default"
            onClick={() => navigate("/enroll")}
          >
            Don't have an account? Enroll here.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
