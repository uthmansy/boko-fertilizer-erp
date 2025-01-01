// import { Button, Modal } from "antd";
// import useViewTransitWaybill from "../../../hooks/useViewWaybill";
// import { VehiclesAndDestination } from "../../../types/db";
// import DocumentViewer from "../../utils/DocumentViewer";
// import TransitWabill from "../../documents/TransitWaybill";

// interface Props {
//   vehicle: VehiclesAndDestination;
// }

// function ViewTransitWaybill({ vehicle }: Props) {
//   const { handleCloseModal, handleOpenModal, isModalOpen, qrCodeDataUri } =
//     useViewTransitWaybill({ vehicle });

//   return (
//     <>
//       <Button onClick={handleOpenModal} type="default">
//         Waybill
//       </Button>
//       <Modal
//         footer={null}
//         title="Waybill"
//         open={isModalOpen}
//         onCancel={handleCloseModal}
//         width={700}
//       >
//         {/* <Waybill data={vehicle} /> */}
//         <DocumentViewer fileName={`Transit-${vehicle.waybill_number}`}>
//           <TransitWabill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
//         </DocumentViewer>
//       </Modal>
//     </>
//   );
// }

// export default ViewTransitWaybill;
