import { Button, Modal } from "antd";
import useReceiveVehicle from "../../../hooks/useReceiveVehicle";
import { VehiclesAndDestination } from "../../../types/db";
import VehicleForm from "./VehicleForm";

interface Props {
  vehicle: VehiclesAndDestination;
}

function ReceiveVehicle({ vehicle }: Props) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    formConfig,
    handleSubmit,
    isLoading,
    shortage,
    onValuesChange,
  } = useReceiveVehicle({ vehicle });

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        Receive
      </Button>
      <Modal
        footer={null}
        title="Receive Vehicle"
        open={isModalOpen}
        onCancel={handleCloseModal}
      >
        <VehicleForm
          formConfig={formConfig}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          onValuesChange={onValuesChange}
          shortage={shortage}
          vehicle={vehicle}
        />
      </Modal>
    </>
  );
}

export default ReceiveVehicle;
