import { Table } from "antd";
import useDispatchedVehicles from "../../../hooks/useDispatchedVehicles"; // Use a hook for dispatched vehicles
import { useVehicleColumns } from "../../../tableColumns/vehicles"; // Columns for dispatched vehicles
import FormBuilder from "../../utils/FormBuilder";

function AllDispatchedVehicles() {
  const {
    isLoading,
    vehicles,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  } = useDispatchedVehicles(); // Use the correct hook for dispatched vehicles

  const { dispatchedColumns } = useVehicleColumns();

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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px", // Optional: to add spacing between the columns
          }}
        />
      </div>
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={dispatchedColumns} // Use the correct columns for dispatched vehicles
        dataSource={vehicles}
        pagination={false} // Disable pagination
        scroll={{ y: 450, x: "max-content" }}
        bordered
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (
            Math.round(target.scrollHeight - target.scrollTop) ===
            target.clientHeight
          ) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default AllDispatchedVehicles;
