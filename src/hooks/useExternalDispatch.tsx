import { useEffect } from "react";
import useDispatchStore from "../store/dispatch";

function useExternalDispatch() {
  const { setFromExternalStock } = useDispatchStore();

  useEffect(() => {
    setFromExternalStock(true);
  }, []);

  return {};
}

export default useExternalDispatch;
