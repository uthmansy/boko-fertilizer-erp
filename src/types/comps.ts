import { Rule } from "antd/es/form";
import { valueType } from "antd/es/statistic/utils";

export interface SelectOption {
  value: string | boolean | number;
  label: string;
}

export interface ExternalStockItems {
  stockId: string;
  item: string | null;
}

export interface FieldConfig {
  name: string;
  label?: string;
  noLabel?: boolean;
  type:
    | "text"
    | "email"
    | "password"
    | "confirmPassword"
    | "number"
    | "textarea"
    | "checkbox"
    | "date"
    | "money"
    | "select"
    | "dynamic"
    | "search"
    | "image"
    | "group";
  nestAsArray?: boolean;
  groupLabel?: string;
  groupFields?: FieldConfig[];
  groupStyle?: React.CSSProperties;
  groupClassName?: string;
  showBasedOn?: {
    field: string;
    value: string | boolean | number; // Show this field only when 'as_collection' is true
  };
  onSearch?: (value: string) => void;
  picker?: "week" | "month" | "quarter" | "year";
  defaultValue?: valueType | boolean | undefined;
  required?: boolean;
  rules?: Rule[];
  suffix?: string;
  options?: SelectOption[];
  onSelect?: (value: string | number | boolean) => void;
  dependencies?: string[];
  getValueFromDependency?: (values: Record<string, any> | undefined) => any;
  getMaxFromDependency?: (
    values: Record<string, any> | undefined
  ) => number | undefined;
  max?: number;
  min?: number;
  subFields?: FieldConfig[];
  defaultSubFields?: any[];
}
