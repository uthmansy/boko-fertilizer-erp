import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { PurchasesAndPayments } from "../types/db";
import { svgToDataUri } from "../helpers/functions";
import { renderToString } from "react-dom/server";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  qrCodeDataUri: string;
}

interface Props {
  purchase: PurchasesAndPayments;
}

function usePurchaseRecord({ purchase }: Props): HookReturn {
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
      const svg = <QRCodeSVG value={purchase.order_number} />;

      const dataUri = await svgToDataUri(renderToString(svg));
      setQrCodeDataUri(dataUri || "");
    }
    convertSvgToDataUri();
  }, [purchase.order_number]);

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    qrCodeDataUri,
  };
}

export default usePurchaseRecord;
