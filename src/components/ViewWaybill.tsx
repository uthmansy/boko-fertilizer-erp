import { Button, Modal } from "antd";
import useViewWaybill from "../hooks/useViewWaybill";
import DocumentViewer from "./utils/DocumentViewer";
import TransitWaybill from "./documents/TransitWaybill";
import { VehiclesAndDestination } from "../types/db";
import ReceivedWaybill from "./pages/receivedVehicles/ReceivedWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
  type: "transit" | "received" | "dispatched";
}

function ViewWaybill({ vehicle, type }: Props) {
  const { handleCloseModal, handleOpenModal, isModalOpen, qrCodeDataUri } =
    useViewWaybill({ vehicle });

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        Waybill
      </Button>
      <Modal
        footer={null}
        title="Waybill"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={700}
      >
        {/* <Waybill data={vehicle} /> */}
        <DocumentViewer fileName={`Transit-${vehicle.waybill_number}`}>
          {type === "transit" ? (
            <TransitWaybill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
          ) : type === "received" ? (
            <ReceivedWaybill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
          ) : (
            <TransitWaybill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
          )}
        </DocumentViewer>
      </Modal>
    </>
  );
}

export default ViewWaybill;
