import { Modal } from "antd";
import useReceiveVehicle from "../../../hooks/useReceiveVehicle";
import { VehiclesAndDestination } from "../../../types/db";
import VehicleForm from "../transit/VehicleForm";
import { useEffect } from "react";

interface Props {
  vehicle: VehiclesAndDestination;
}

function ReceiveScanVehicle({ vehicle }: Props) {
  const {
    formConfig,
    handleSubmit: handleReceive,
    isLoading: isReceiving,
    shortage,
    onValuesChange,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  } = useReceiveVehicle({ vehicle });

  useEffect(() => {
    handleOpenModal();
  }, []);

  return (
    <Modal
      footer={null}
      title="Receive Vehicle"
      open={isModalOpen}
      onCancel={handleCloseModal}
    >
      <VehicleForm
        formConfig={formConfig}
        handleSubmit={handleReceive}
        isLoading={isReceiving}
        onValuesChange={onValuesChange}
        shortage={shortage}
        vehicle={vehicle}
      />
    </Modal>
  );
}

export default ReceiveScanVehicle;
