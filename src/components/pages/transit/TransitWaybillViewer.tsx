import { VehiclesAndDestination } from "../../../types/db";
import DocumentViewer from "../../utils/DocumentViewer";
import TransitWabill from "../../documents/TransitWaybill";
import useViewTransitWaybill from "../../../hooks/useViewWaybill";
import DispatchedWaybill from "../../documents/DispatchedWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TransitWaybillViewer({ vehicle }: Props) {
  const { qrCodeDataUri } = useViewTransitWaybill({ vehicle });

  return (
    <>
      {/* <Waybill data={vehicle} /> */}
      <DocumentViewer fileName={`Transit-${vehicle.waybill_number}`}>
        {vehicle.sale_order_number ? (
          <DispatchedWaybill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
        ) : (
          <TransitWabill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
        )}
      </DocumentViewer>
    </>
  );
}

export default TransitWaybillViewer;
