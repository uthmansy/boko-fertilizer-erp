import useAuthStore from "../../../store/auth";
import AddBonus from "./AddBonus";
import AllBonuses from "./AllBonuses";

interface Props {
  payrollId: string;
}

function Bonuses({ payrollId }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "ACCOUNTING") && (
          <AddBonus payrollId={payrollId} />
        )}
      </div>
      <AllBonuses payrollId={payrollId} />
    </>
  );
}

export default Bonuses;
