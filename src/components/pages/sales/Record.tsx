import { Button, Modal } from "antd";
import { SalesAndPayments } from "../../../types/db";
import useSaleRecord from "../../../hooks/useSaleRecord";
import DocumentViewer from "../../utils/DocumentViewer";
import SaleRecord from "../../documents/SaleRecord";

interface Props {
  sale: SalesAndPayments;
}

function Record({ sale }: Props) {
  const { handleCloseModal, handleOpenModal, isModalOpen, qrCodeDataUri } =
    useSaleRecord({ sale });

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
        <DocumentViewer fileName={`Sale-${sale.order_number}`}>
          <SaleRecord data={sale} qrCodeDataUri={qrCodeDataUri} />
        </DocumentViewer>
      </Modal>
    </>
  );
}

export default Record;
