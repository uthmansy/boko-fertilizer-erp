import { Button, Space } from "antd";
import useEnrollStore from "../../../store/enroll"; // Updated store import
import VerifyEmail from "../enroll/VerifyEmail"; // Import VerifyEmail component
import SignUp from "../enroll/SignUp"; // Import SignUp component
import SuccessMessage from "./SuccessMessage";
import { LOGO } from "../../../assets/images"; // Import logo or background image

function Enroll() {
  const { currentPage, prevPage, resetValues } = useEnrollStore(); // Use the updated store

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${LOGO})`, // Add your background image here
          backgroundSize: "75%", // Adjust size as needed
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.1, // Faint effect
        }}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-md bg-white p-6 drop-shadow-lg">
        <Space className="mb-5">
          {currentPage === 2 && (
            <Button type="primary" onClick={prevPage}>
              Back
            </Button>
          )}
          {currentPage === 2 && (
            <Button type="primary" onClick={resetValues}>
              Reset
            </Button>
          )}
        </Space>
        {currentPage === 1 && <VerifyEmail />}
        {currentPage === 2 && <SignUp />}
        {currentPage === 3 && <SuccessMessage />}
      </div>
    </div>
  );
}

export default Enroll;
