import { App } from "antd";
import { QueryKey, useQuery } from "react-query";

function useCsv<T>({
  queryFn,
  queryKey,
}: {
  queryFn: () => Promise<T>;
  queryKey: QueryKey;
}): {
  data: T | undefined;
} {
  const { message } = App.useApp();

  const { data } = useQuery(queryKey, {
    queryFn,
    onError: () => {
      message.error("Error getting Csv Data");
    },
  });

  return { data };
}

export default useCsv;
