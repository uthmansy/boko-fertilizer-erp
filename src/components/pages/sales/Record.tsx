import { Button, Modal, Tabs, TabsProps } from "antd";
import { SalesAndPayments } from "../../../types/db";
import useSaleRecord from "../../../hooks/useSaleRecord";
import DocumentViewer from "../../utils/DocumentViewer";
import SaleRecord from "../../documents/SaleRecord";
import TabLabel from "../../TabLabel";
import { VscChecklist, VscRepo } from "react-icons/vsc";
import Invoice from "./Invoice";

interface Props {
  sale: SalesAndPayments;
}

function Record({ sale }: Props) {
  const { handleCloseModal, handleOpenModal, isModalOpen, qrCodeDataUri } =
    useSaleRecord({ sale });

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: <TabLabel Icon={VscRepo} label="Sale Record" />,
      children: (
        <>
          <DocumentViewer fileName={`Sale-${sale.order_number}`}>
            <SaleRecord data={sale} qrCodeDataUri={qrCodeDataUri} />
          </DocumentViewer>
        </>
      ),
    },
    {
      key: "2",
      label: <TabLabel Icon={VscChecklist} label="Invoice" />,
      children: <Invoice data={sale} />,
    },
  ];

  return (
    <>
      <Button onClick={handleOpenModal} type="default">
        Print
      </Button>
      <Modal
        footer={null}
        title="Record"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={700}
      >
        <Tabs size="large" defaultActiveKey="1" items={tabs} />
      </Modal>
    </>
  );
}

export default Record;
