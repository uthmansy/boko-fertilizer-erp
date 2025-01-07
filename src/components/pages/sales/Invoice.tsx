import { Select } from "antd";
import useInvoice from "../../../hooks/useInvoice";
import { SalesAndPayments } from "../../../types/db";
import DocumentViewer from "../../utils/DocumentViewer";
import InvoiceDoc from "../../documents/InvoiceDoc";

interface SaleRecordProps {
  data: SalesAndPayments;
}

function Invoice({ data }: SaleRecordProps) {
  const { account, accountsOption, handleAccount } = useInvoice();

  return (
    <div>
      <div className="mb-5">
        <Select
          placeholder="Filter by name"
          className="w-56"
          options={accountsOption}
          onSelect={handleAccount}
        />
      </div>
      {account ? (
        <DocumentViewer fileName={`INV-${data.order_number}`}>
          <InvoiceDoc account={account} sale={data} />
        </DocumentViewer>
      ) : (
        <div>select an account</div>
      )}
    </div>
  );
}

export default Invoice;
