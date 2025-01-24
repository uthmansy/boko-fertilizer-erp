import { Alert, Button, Space } from "antd";
import useDispatchStore from "../../../store/dispatch";
import { useEffect } from "react";
import SelectToCustomer from "../externalDispatch/SelectToCustomer";
import DispatchForm from "../externalDispatch/DispatchForm";
import TransitWaybillViewer from "../transit/TransitWaybillViewer";

function InternalDispatch() {
  // Changed the component name
  const {
    currentPage,
    prevPage,
    resetValues,
    setFromExternalStock,
    setToCustomer,
    newDispatchVehicle,
  } = useDispatchStore(); // Updated to use internal stock setting

  useEffect(() => {
    resetValues();
    setFromExternalStock(false); // Set to internal stock
    setToCustomer(true);
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
              setFromExternalStock(false);
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
          <TransitWaybillViewer vehicle={newDispatchVehicle} />
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
