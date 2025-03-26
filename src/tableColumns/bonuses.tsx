import { ColumnsType } from "antd/es/table";
import { formatNumber } from "../helpers/functions";
import { PayrollBonus } from "../zodSchemas/payrollBonuses";
import BonusActions from "../components/pages/payrolls/BonusActions";

export const bonusColumns: ColumnsType<PayrollBonus> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => <span>₦{formatNumber(record.amount)}</span>, // Adjust formatting as needed
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    render: (_, record) => <span>{record.note}</span>, // Adjust formatting as needed
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => <BonusActions record={record} />,
  },
];
