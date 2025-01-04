import {
  BorderInnerOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Empty,
  Modal,
  Select,
  Spin,
  Statistic,
  Table,
} from "antd";
import useDailyProduction from "../../../hooks/useDailyProduction";
import { dailyProductionColumns } from "../../../tableColumns/dailyProduction";
import {
  formatDateString,
  formatNumber,
  getDayFromDate,
} from "../../../helpers/functions";
import useDarkMode from "../../../store/theme";
import { VscSettings } from "react-icons/vsc";
import { CSVLink } from "react-csv";
import DocumentViewer from "../../utils/DocumentViewer";
import DailyProductionDoc from "../../documents/DailyProductionDoc";
import useAuthStore from "../../../store/auth";

function DailyProduction() {
  const {
    isLoading,
    isRefetching,
    morningShift,
    nightShift,
    date,
    // formConfig,
    // handleSubmit,
    totalQuantityProduced,
    isLoadingSummary,
    isRefetchingSummary,
    summaryTableItems,
    handleDate,
    handleName,
    names,
    csvData,
    csvHeaders,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    stockRecord,
    warehouses,
    handleWarehouse,
  } = useDailyProduction();
  const { darkMode } = useDarkMode();
  const { userProfile } = useAuthStore();

  return (
    <>
      <Breadcrumb
        className="mb-5"
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <span className="uppercase">Daily Production Report</span>
              </>
            ),
          },
        ]}
      />
      {/* <FormBuilder formConfig={formConfig} onSubmit={handleSubmit} /> */}
      <div className="mb-5 flex space-x-3 items-center">
        <div className="">
          <VscSettings />
        </div>
        <DatePicker className="w-56" onChange={(date) => handleDate(date)} />
        <Select
          placeholder="Filter by name"
          className="w-56"
          options={names}
          onSelect={handleName}
        />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN") && (
          <Select
            placeholder="Filter by Warehouse"
            className="w-56"
            options={warehouses}
            onSelect={handleWarehouse}
          />
        )}

        {csvData && (
          <Button icon={<BorderInnerOutlined />}>
            <CSVLink
              filename={`Daily-production-${date}.csv`}
              data={csvData}
              headers={csvHeaders}
            >
              Export to CSV
            </CSVLink>
          </Button>
        )}
        <Button onClick={handleOpenModal} icon={<PrinterOutlined />}>
          Print
        </Button>
      </div>
      <div>
        <h2 className="text-2xl mb-5 uppercase font-semibold">
          Daily Production Summary for{" "}
          <span className="text-primary">
            {date
              ? `${getDayFromDate(date)} ${
                  formatDateString(date) || "Invalid Date"
                }`
              : "Today"}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="mb-5 uppercase">Morning Shift</h2>
          <Table
            size="small"
            loading={isLoading || isRefetching}
            columns={dailyProductionColumns}
            dataSource={morningShift}
            pagination={false} // Disable pagination
            scroll={{ y: 450, x: "max-content" }}
            bordered
          />
        </div>
        <div>
          <h2 className="mb-5 uppercase">Night Shift</h2>
          <Table
            size="small"
            loading={isLoading || isRefetching}
            columns={dailyProductionColumns}
            dataSource={nightShift}
            pagination={false} // Disable pagination
            scroll={{ y: 450, x: "max-content" }}
            bordered
          />
        </div>
        <div>
          <h2 className="mb-5 uppercase">Summary</h2>
          <div
            className={`mb-5 p-5 md:p-10 ${
              darkMode ? "bg-black" : "bg-gray-200"
            }`}
          >
            <Card
              title="Total Production"
              bordered={true}
              style={{ width: "100%" }}
            >
              <Statistic
                title="Total Produced for the day"
                value={
                  totalQuantityProduced
                    ? formatNumber(totalQuantityProduced)
                    : "0"
                }
                suffix={"bales"}
              />
            </Card>
          </div>
          {isLoadingSummary || isRefetchingSummary ? (
            <div className="flex items-center justify-center h-full">
              <Spin />
            </div>
          ) : summaryTableItems ? (
            <Descriptions
              title={`Summary of stock records`}
              layout="horizontal"
              bordered
              items={summaryTableItems}
              column={1}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <Modal
        footer={null}
        title="Daily Production"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={720}
      >
        <DocumentViewer fileName={`Daily-production-${date}.pdf`}>
          <DailyProductionDoc
            date={date || ""}
            morningShift={morningShift || []}
            nightShift={nightShift || []}
            stockRecord={stockRecord || []}
            totalQuantityProduced={totalQuantityProduced || 0}
          />
        </DocumentViewer>
      </Modal>
    </>
  );
}

export default DailyProduction;
