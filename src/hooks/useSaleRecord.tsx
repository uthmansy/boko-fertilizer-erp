import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { SalesAndPayments } from "../types/db";
import { svgToDataUri } from "../helpers/functions";
import { renderToString } from "react-dom/server";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  qrCodeDataUri: string;
}

interface Props {
  sale: SalesAndPayments;
}

function useSaleRecord({ sale }: Props): HookReturn {
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
      const svg = <QRCodeSVG value={sale.order_number} />;

      const dataUri = await svgToDataUri(renderToString(svg));
      setQrCodeDataUri(dataUri || "");
    }
    convertSvgToDataUri();
  }, [sale.order_number]);

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    qrCodeDataUri,
  };
}

export default useSaleRecord;
