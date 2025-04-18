import { useQuery } from "react-query";
import { VehiclesAndDestination } from "../types/db";
import { App } from "antd";
import { vehiclesKeys } from "../constants/QUERY_KEYS";
import { getVehicleById } from "../helpers/apiFunctions";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { svgToDataUri } from "../helpers/functions";
import { renderToString } from "react-dom/server";

interface HookReturn {
  vehicle: VehiclesAndDestination | undefined;
  isLoading: boolean;
  qrCodeDataUri: string;
}

interface Props {
  vehicleId: string;
}

function useVehicle({ vehicleId }: Props): HookReturn {
  const { message } = App.useApp();
  const [qrCodeDataUri, setQrCodeDataUri] = useState<string>("");

  const { data: vehicle, isLoading } = useQuery({
    queryKey: [vehiclesKeys.getVehicleById, vehicleId],
    queryFn: async (): Promise<VehiclesAndDestination> => {
      const vehicle = await getVehicleById(vehicleId);
      return vehicle;
    },
    onError: () => {
      message.error("Failed to Load Vehicle");
    },
  });

  useEffect(() => {
    async function convertSvgToDataUri() {
      const svg = vehicle && <QRCodeSVG value={vehicle.waybill_number} />;

      const dataUri = await svgToDataUri(renderToString(svg));
      setQrCodeDataUri(dataUri || "");
    }
    convertSvgToDataUri();
  }, [vehicle]);

  return {
    vehicle,
    isLoading,
    qrCodeDataUri,
  };
}

export default useVehicle;
