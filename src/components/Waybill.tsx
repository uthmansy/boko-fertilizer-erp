import React from "react";
import { VehiclesAndDestination } from "../types/db";
import { QRCode, Watermark } from "antd";

interface WaybillProps {
  data: VehiclesAndDestination;
}

const Waybill: React.FC<WaybillProps> = ({ data }) => {
  return (
    <Watermark gap={[30, 30]} content={["Ant Design", "Happy Working"]}>
      <div className="p-8 mx-auto bg-white shadow-lg rounded-lg max-w-a4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <img
              src="/path/to/company/logo.png"
              alt="Company Logo"
              className="h-16"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Waybill</h1>
            <p className="font-bold">Waybill Number: {data.waybill_number}</p>
            <p className="font-bold">Vehicle Number: {data.vehicle_number}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Dispatched By: {data.dispatched_by}</p>
            <p className="font-bold">Driver Name: {data.driver_name}</p>
          </div>
        </div>
        {data.destination_stock && (
          <div className="mb-6">
            <h2 className="text-xl font-bold">Destination Stock Details</h2>
            <p className="font-bold">
              Warehouse: {data.destination_stock.warehouse}
            </p>
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-xl font-bold">External Origin Stock Details</h2>
          <p className="font-bold">
            Order Number: {data.external_origin_stock.order_number || ""}
          </p>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Item</th>
              <th className="border border-gray-300 p-2">Quantity Carried</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">{data.item}</td>
              <td className="border border-gray-300 p-2">{data.qty_carried}</td>
            </tr>
          </tbody>
        </table>
        <QRCode value={"hellohellohellohellohellohello"} />
      </div>
    </Watermark>
  );
};

export default Waybill;
