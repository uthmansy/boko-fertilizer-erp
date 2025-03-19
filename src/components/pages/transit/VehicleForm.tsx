import FormBuilder from "../../utils/FormBuilder";
import { VehiclesAndDestination } from "../../../types/db";
import { FieldConfig } from "../../../types/comps";

interface Props {
  vehicle: VehiclesAndDestination;
  formConfig: FieldConfig[];
  isLoading: boolean;
  handleSubmit: (values: any) => void;
}

function VehicleForm({ formConfig, isLoading, handleSubmit }: Props) {
  return (
    <>
      <FormBuilder
        formConfig={formConfig}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    </>
  );
}

export default VehicleForm;
