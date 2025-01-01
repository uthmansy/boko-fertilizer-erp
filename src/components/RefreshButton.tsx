import { Button } from "antd";
import { RiRefreshLine } from "react-icons/ri";
import { useQueryClient } from "react-query";

interface Props {
  queryKey: string;
}

function RefreshButton({ queryKey }: Props) {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return (
    <Button onClick={handleRefresh}>
      <RiRefreshLine />
    </Button>
  );
}

export default RefreshButton;
