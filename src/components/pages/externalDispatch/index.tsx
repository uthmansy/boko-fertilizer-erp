import { Alert, Button, Space } from "antd";
import useExternalDispatch from "../../../hooks/useExternalDispatch";
import useDispatchStore from "../../../store/dispatch";
import SelectToCustomer from "./SelectToCustomer";
import DispatchForm from "./DispatchForm";
import { useEffect } from "react";
import TransitWaybill from "../transit/TransitWaybill";

function ExternalDispatch() {
  const {} = useExternalDispatch();
  const {
    currentPage,
    prevPage,
    resetValues,
    setFromExternalStock,
    newDispatchVehicle,
  } = useDispatchStore();
  useEffect(() => {
    resetValues();
    setFromExternalStock(true);
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
              setFromExternalStock(true);
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
          <TransitWaybill vehicle={newDispatchVehicle} />
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
