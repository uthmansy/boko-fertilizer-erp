// import { Table } from "antd";
// import { transportFeesAdminColumns } from "../../../tableColumns/transportFees"; // Updated columns import
// import useAllTransportFees from "../../../hooks/useAllTransportFees"; // Updated hook import

// function AllTransportFees() {
//   const {
//     isLoading,
//     transportFees,
//     fetchNextPage,
//     isFetchingNextPage,
//     isRefetching,
//   } = useAllTransportFees();

//   return (
//     <Table
//       size="small"
//       loading={isLoading || isFetchingNextPage || isRefetching}
//       columns={transportFeesAdminColumns} // Updated columns reference
//       dataSource={transportFees} // Updated data source
//       pagination={false} // Disable pagination
//       scroll={{ y: 600 , x:1100 }}
//       onScroll={(e) => {
//         const target = e.target as HTMLDivElement;
//         if (target.scrollHeight - target.scrollTop === target.clientHeight) {
//           fetchNextPage();
//         }
//       }}
//     />
//   );
// }

// export default AllTransportFees;
