import useDispatchStore from "../../../store/dispatch";
import Waybill from "../../Waybill";

function DisplayWaybill() {
  const { newDispatchVehicle } = useDispatchStore();

  console.log(newDispatchVehicle);

  return newDispatchVehicle && <Waybill data={newDispatchVehicle} />;
}

export default DisplayWaybill;
