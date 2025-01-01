import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { VehiclesAndDestination } from "../types/db";
import { svgToDataUri } from "../helpers/functions";
import { renderToString } from "react-dom/server";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  qrCodeDataUri: string;
}

interface Props {
  vehicle: VehiclesAndDestination;
}

function useViewWaybill({ vehicle }: Props): HookReturn {
  const [qrCodeDataUri, setQrCodeDataUri] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function convertSvgToDataUri() {
      const svg = <QRCodeSVG value={vehicle.waybill_number} />;

      const dataUri = await svgToDataUri(renderToString(svg));
      setQrCodeDataUri(dataUri || "");
    }
    convertSvgToDataUri();
  }, [vehicle.waybill_number]);

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    qrCodeDataUri,
  };
}

export default useViewWaybill;
