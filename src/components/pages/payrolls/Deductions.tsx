import useAuthStore from "../../../store/auth";
import AddDeduction from "./AddDeduction";
import AllDeductions from "./AllDeductions";

interface Props {
  payrollId: string;
}

function Deductions({ payrollId }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "ACCOUNTING") && (
          <AddDeduction payrollId={payrollId} />
        )}
      </div>
      <AllDeductions payrollId={payrollId} />
    </>
  );
}

export default Deductions;
