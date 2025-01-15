import { Table } from "antd";
import useAllAccounts from "../../../hooks/useAllAccounts";
import { paymentAccountsColumns } from "../../../tableColumns/paymentAccounts";

function AllAccounts() {
  const { isLoading, accounts, isRefetching } = useAllAccounts();

  return (
    <Table
      size="small"
      loading={isLoading || isRefetching}
      columns={paymentAccountsColumns}
      dataSource={accounts}
      pagination={false} // Disable pagination
      scroll={{ y: 550, x: "max-content" }}
      bordered
    />
  );
}

export default AllAccounts;
