import { Alert, Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";
import SelectToCustomer from "./SelectToCustomer";
import DispatchForm from "./DispatchForm";
import { useEffect } from "react";
import ShowDispatchWaybill from "./ShowDispatchWaybill";

function ExternalDispatch() {
  const {
    currentPage,
    prevPage,
    resetValues,
    setOriginType,
    setDispatchType,
    newDispatchVehicle,
  } = useDispatchStore();
  useEffect(() => {
    resetValues();
    setOriginType("external"); // Set to internal stock
    setDispatchType("purchase");
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
              setOriginType("external");
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
      {currentPage === 1 && <SelectToCustomer />}
      {currentPage === 2 && <DispatchForm />}
      {currentPage === 3 &&
        (newDispatchVehicle ? (
          <ShowDispatchWaybill
            type="warehouse"
            vehicleId={newDispatchVehicle}
          />
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

export default ExternalDispatch;
