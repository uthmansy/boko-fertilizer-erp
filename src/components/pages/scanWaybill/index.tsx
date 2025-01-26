import { QrcodeOutlined } from "@ant-design/icons";
import { Spin, Typography } from "antd";
import useScanWaybill from "../../../hooks/useScanWaybill";
import ReceiveScanVehicle from "./ReceiveScanVehicle";

const { Title } = Typography;

const ScanWaybill: React.FC = () => {
  const { handleSubmit, inputRef, isLoading, vehicle } = useScanWaybill(); // Destructure hook's values

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {isLoading ? (
        <Spin tip="Loading" size="large" />
      ) : (
        <>
          <Title className="text-2xl mb-4 text-center">WAYBILL SCANNER</Title>
          <QrcodeOutlined style={{ fontSize: "150px" }} />
        </>
      )}
      {vehicle && <ReceiveScanVehicle vehicle={vehicle} />}
      {/* Hidden input field for capturing the QR code scan */}
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" className="absolute opacity-0 h-0" />
      </form>
    </div>
  );
};

export default ScanWaybill;
