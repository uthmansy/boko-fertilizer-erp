import { Button, Modal } from "antd";
import { PurchasesAndPayments } from "../../../types/db";
import usePurchaseRecord from "../../../hooks/usePurchaseRecord";
import DocumentViewer from "../../utils/DocumentViewer";
import PurchaseRecord from "../../documents/PurchaseRecord";

interface Props {
  purchase: PurchasesAndPayments;
}

function Record({ purchase }: Props) {
  const { handleCloseModal, handleOpenModal, isModalOpen, qrCodeDataUri } =
    usePurchaseRecord({ purchase });

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        View
      </Button>
      <Modal
        footer={null}
        title="Record"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={700}
      >
        {/* <Waybill data={vehicle} /> */}
        <DocumentViewer fileName={`Purchase-${purchase.order_number}`}>
          <PurchaseRecord data={purchase} qrCodeDataUri={qrCodeDataUri} />
        </DocumentViewer>
      </Modal>
    </>
  );
}

export default Record;
