import { VehiclesAndDestination } from "../../../types/db";
import DocumentViewer from "../../utils/DocumentViewer";
import TransitWabill from "../../documents/TransitWaybill";
import useViewTransitWaybill from "../../../hooks/useViewWaybill";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TransitWaybill({ vehicle }: Props) {
  const { qrCodeDataUri } = useViewTransitWaybill({ vehicle });

  return (
    <>
      {/* <Waybill data={vehicle} /> */}
      <DocumentViewer fileName={`Transit-${vehicle.waybill_number}`}>
        <TransitWabill data={vehicle} qrCodeDataUri={qrCodeDataUri} />
      </DocumentViewer>
    </>
  );
}

export default TransitWaybill;
