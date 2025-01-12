import { Flex, Tag } from "antd";
import FormBuilder from "../../utils/FormBuilder";
import { VehiclesAndDestination } from "../../../types/db";
import { FieldConfig } from "../../../types/comps";
import { formatNumber } from "../../../helpers/functions";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

interface Props {
  vehicle: VehiclesAndDestination;
  formConfig: FieldConfig[];
  isLoading: boolean;
  onValuesChange: (values: any) => void;
  handleSubmit: (values: any) => void;
  shortage: number;
}

function VehicleForm({
  formConfig,
  vehicle,
  isLoading,
  onValuesChange,
  handleSubmit,
  shortage,
}: Props) {
  return (
    <>
      <div className="mb-5">
        <Flex gap="4px 0" wrap>
          <Tag icon={<SyncOutlined spin />} color="processing">
            {vehicle.item}
          </Tag>
          <Tag icon={<CheckCircleOutlined />} color="success">
            Carried: {formatNumber(vehicle.qty_carried)}{" "}
            {vehicle.item_info.unit}
          </Tag>
          <Tag icon={<CloseCircleOutlined />} color="error">
            Shortage: {formatNumber(shortage)} {vehicle.item_info.unit}
          </Tag>
        </Flex>
      </div>

      <FormBuilder
        formConfig={formConfig}
        onSubmit={handleSubmit}
        loading={isLoading}
        onChange={onValuesChange}
      />
    </>
  );
}

export default VehicleForm;
