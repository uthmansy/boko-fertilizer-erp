import { Alert, Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";
import { useEffect } from "react";
import DispatchForm from "../externalDispatch/DispatchForm";
import SelectType from "./SelectType";
import ShowDispatchWaybill from "../externalDispatch/ShowDispatchWaybill";

function InternalDispatch() {
  const {
    currentPage,
    prevPage,
    resetValues,
    setOriginType,
    setDispatchType,
    newDispatchVehicle,
  } = useDispatchStore(); // Updated to use internal stock setting

  useEffect(() => {
    resetValues();
    setOriginType("internal"); // Set to internal stock
    setDispatchType("sale");
  }, []);

  return (
    <div>
      <Space className="mb-5">
        {currentPage !== 1 && currentPage !== 3 && (
          <Button type="primary" onClick={prevPage}>
            Back
          </Button>
        )}
        {currentPage == 3 && (
          <Button
            type="primary"
            onClick={() => {
              resetValues();
              setOriginType("internal");
            }}
          >
            Reset
          </Button>
        )}
        {/* {currentPage !== 3 && (
          <Button type="primary" onClick={nextPage}>
            Next
          </Button>
        )} */}
      </Space>
      {currentPage === 1 && <SelectType />}
      {currentPage === 2 && <DispatchForm />}
      {currentPage === 3 &&
        (newDispatchVehicle ? (
          <ShowDispatchWaybill type="customer" vehicleId={newDispatchVehicle} />
        ) : (
          <Alert
            message="Error"
            description="Error Loading Dispatched Vehicle."
            type="error"
            showIcon
          />
        ))}
    </div>
  );
}

export default InternalDispatch; // Updated the export name
