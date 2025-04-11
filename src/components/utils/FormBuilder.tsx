import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  FormInstance,
} from "antd";
import { FieldConfig } from "../../types/comps";
import { CloseOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

// const { Option } = Select;
const { Search } = Input;

interface FormBuilderProps {
  formConfig: FieldConfig[];
  onSubmit: (values: any) => void;
  loading?: boolean;
  columns?: 1 | 2;
  onChange?: (changedValues: any) => void;
  styles?: React.CSSProperties;
  showSubmitButton?: boolean;
  fullWidthButton?: boolean;
  form?: FormInstance;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formConfig,
  onSubmit,
  loading = false,
  columns = 1,
  onChange = () => null,
  styles = {},
  showSubmitButton = true,
  fullWidthButton = false,
  form: externalForm,
}) => {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm; // Use provided form or internal
  const [formValues, setFormValues] = useState(form.getFieldsValue());

  useEffect(() => {
    const initialValues = formConfig.reduce((acc, field) => {
      if (field.type === "dynamic" && field.defaultSubFields) {
        acc[field.name] = field.defaultSubFields;
      }
      if (field.type === "group" && field.nestAsArray) {
        acc[field.name] = field.defaultSubFields || [{}];
      }
      return acc;
    }, {} as Record<string, any>);

    form.setFieldsValue(initialValues);
  }, [form, formConfig]);

  const onFinish = (values: any) => {
    const validatedValues = { ...values };

    formConfig.forEach((field) => {
      if (field.type === "number" && field.max !== undefined) {
        if (validatedValues[field.name] > field.max) {
          validatedValues[field.name] = field.max;
        }
      }
    });

    onSubmit(validatedValues);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues);
    formConfig.forEach((field) => {
      if (field.dependencies) {
        const dependencyValues = field.dependencies.reduce(
          (acc, dependency) => ({
            ...acc,
            [dependency]: allValues[dependency],
          }),
          {}
        );

        if (field.getValueFromDependency) {
          const newValue = field.getValueFromDependency(dependencyValues);
          if (form.getFieldValue(field.name) !== newValue) {
            form.setFieldsValue({
              [field.name]: newValue,
            });
          }
        }

        if (field.getMaxFromDependency) {
          const newMax = field.getMaxFromDependency(dependencyValues);
          const currentValue = form.getFieldValue(field.name);
          if (newMax && currentValue > newMax) {
            form.setFieldsValue({
              [field.name]: newMax,
            });
          }
          field.max = newMax; // Update the max property for rendering
        }
      }
    });
    onChange(changedValues);
  };

  const shouldShowField = (field: FieldConfig, allValues: any) => {
    if (field.showBasedOn) {
      const dependencyValue = allValues[field.showBasedOn.field];
      return dependencyValue === field.showBasedOn.value;
    }
    return true;
  };

  const renderFormField = (field: FieldConfig) => {
    switch (field.type) {
      case "textarea":
        return (
          <Input.TextArea
            //@ts-ignore
            defaultValue={field.defaultValue}
            rows={5}
            placeholder={field.label}
          />
        );
      case "checkbox":
        return <Checkbox>{field.label}</Checkbox>;
      case "select":
        return (
          <Select
            //@ts-ignore
            defaultValue={field.defaultValue}
            placeholder={field.label}
            showSearch
            //@ts-ignore
            onSelect={field.onSelect || (() => null)}
            optionFilterProp="label"
            style={{ minWidth: 130 }}
            options={field.options || []}
          >
            {/* {Array.isArray(field.options) &&
              field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))} */}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            picker={field.picker}
            //@ts-ignore
            defaultValue={field.defaultValue}
            style={{ width: "100%" }}
            // format="YYYY-MM-DD"
          />
        );
      case "money":
        return (
          <InputNumber
            //@ts-ignore
            defaultValue={field.defaultValue}
            placeholder={field.label}
            max={field.max}
            controls={false}
            prefix="₦"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        );
      case "number":
        return (
          <InputNumber
            //@ts-ignore
            defaultValue={field.defaultValue}
            placeholder={field.label}
            max={field.max}
            controls={false}
            suffix={field.suffix || ""}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        );
      case "search":
        return (
          <Search
            //@ts-ignore
            defaultValue={field.defaultValue}
            placeholder={field.label}
            onSearch={field.onSearch || (() => null)}
          />
        );
      case "password":
        return (
          <Input.Password
            name={field.name}
            placeholder="Confirm Your Password"
          />
        );
      case "image":
        return (
          <Dragger
            name={field.name}
            multiple={false}
            beforeUpload={() => {
              return false;
            }}
            listType="picture"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        );
      // case "confirmPassword":
      //   return (
      //     <Input.Password
      //       name={field.name}
      //       placeholder="Confirm Your Password"
      //     />
      //   );
      default:
        return (
          <Input
            //@ts-ignore
            defaultValue={field.defaultValue}
            placeholder={field.label}
            type={field.type}
          />
        );
    }
  };

  return (
    <Form
      preserve={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <div
        style={styles}
        className={`grid ${
          columns === 1 ? "" : "md:grid-cols-2"
        } grid-cols-1 gap-x-3`}
      >
        {formConfig.map((field) => {
          if (field.type === "group") {
            if (field.nestAsArray) {
              return (
                <div
                  key={field.name}
                  style={field.groupStyle}
                  className={`${field.groupClassName} border rounded-lg p-4 mb-4`}
                >
                  {field.groupLabel && (
                    <h3 className="text-lg font-semibold mb-4">
                      {field.groupLabel}
                    </h3>
                  )}
                  <Form.List name={field.name}>
                    {(subFields) => (
                      <div
                        className={`grid ${
                          columns === 1 ? "" : "md:grid-cols-2"
                        } gap-x-3`}
                      >
                        {subFields.map((subField) => (
                          <React.Fragment key={subField.key}>
                            {field.groupFields?.map((sub) => (
                              <Form.Item
                                key={`${field.name}-${subField.key}-${sub.name}`}
                                name={[subField.name, sub.name]}
                                label={!sub.noLabel && sub.label}
                                rules={[
                                  {
                                    required: sub.required || false,
                                    message: `${sub.label} is required`,
                                  },
                                  ...(sub.rules || []),
                                ]}
                              >
                                {renderFormField(sub)}
                              </Form.Item>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </div>
              );
            } else {
              // Original group rendering
              return (
                <div
                  key={field.name}
                  style={field.groupStyle}
                  className={`${field.groupClassName} border rounded-lg p-4 mb-4`}
                >
                  {field.groupLabel && (
                    <h3 className="text-lg font-semibold mb-4">
                      {field.groupLabel}
                    </h3>
                  )}
                  <div
                    className={`grid ${
                      columns === 1 ? "" : "md:grid-cols-2"
                    } gap-x-3`}
                  >
                    {field.groupFields?.map((sub) => (
                      <Form.Item
                        key={sub.name}
                        name={sub.name}
                        label={!sub.noLabel && sub.label}
                        rules={[
                          {
                            required: sub.required || false,
                            message: `${sub.label} is required`,
                          },
                          ...(sub.rules || []),
                        ]}
                      >
                        {renderFormField(sub)}
                      </Form.Item>
                    ))}
                  </div>
                </div>
              );
            }
          }
          if (!shouldShowField(field, formValues)) return null;
          if (field.type === "dynamic")
            return (
              <Form.Item label={!field.noLabel && field.label}>
                <Form.List name={[field.name]}>
                  {(subFields, subOpt) => (
                    <div
                      className="p-5 border-dashed border-2 border-primary rounded "
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 16,
                      }}
                    >
                      {subFields.map((subField) => (
                        <div
                          className="grid grid-cols-2 gap-3 relative px-5 pt-8 pb-4 border border-primary bg-primary/10"
                          key={subField.key}
                        >
                          {field.subFields?.map((field) => (
                            <Form.Item
                              className="w-full"
                              key={field.name}
                              name={[subField.name, field.name]}
                              label={!field.noLabel && field.label}
                              rules={[
                                {
                                  required: field.required || false,
                                  message: `${field.label} is required`,
                                },
                                ...(field.rules || []),
                              ]}
                            >
                              {renderFormField(field)}
                            </Form.Item>
                          ))}
                          <CloseOutlined
                            className="absolute top-0 right-0 p-3 bg-red-600 text-white"
                            onClick={() => {
                              subOpt.remove(subField.name);
                            }}
                          />
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>
                        + Add Item
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            );

          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={!field.noLabel && field.label}
              rules={[
                {
                  required: field.required || false,
                  message: `${field.label} is required`,
                },
                ...(field.rules || []),
              ]}
            >
              {renderFormField(field)}
            </Form.Item>
          );
        })}
      </div>
      <Form.Item style={{ display: !showSubmitButton ? "none" : "block" }}>
        <Button
          style={fullWidthButton ? { width: "100%" } : undefined}
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          className="uppercase"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBuilder;
