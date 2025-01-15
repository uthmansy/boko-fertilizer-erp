import { Table } from "antd";
import useReceivedVehicles from "../../../hooks/useReceivedVehicles"; // Use a hook for received vehicles
import { useVehicleColumns } from "../../../tableColumns/vehicles"; // Columns for received vehicles
import FormBuilder from "../../utils/FormBuilder";

function AllReceivedVehicles() {
  const {
    isLoading,
    vehicles,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  } = useReceivedVehicles(); // Use the correct hook for received vehicles

  const { receivedColumns } = useVehicleColumns();

  return (
    <>
      <div className="max-w-max overflow-x-auto">
        <FormBuilder
          formConfig={filterFormConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
          showSubmitButton={false}
          styles={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px", // Optional: to add spacing between the columns
          }}
        />
      </div>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={receivedColumns} // Use the correct columns for received vehicles
        dataSource={vehicles}
        pagination={false} // Disable pagination
        scroll={{ y: 550, x: "max-content" }}
        bordered
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default AllReceivedVehicles;
