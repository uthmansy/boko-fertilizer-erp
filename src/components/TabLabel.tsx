import { IconType } from "react-icons";

interface Props {
  label: string;
  Icon: IconType;
}

function TabLabel({ Icon, label }: Props) {
  return (
    <div className="font-bold uppercase flex space-x-2 items-center">
      <Icon className="text-inherit opacity-70 text-xs" />
      <span>{label}</span>
    </div>
  );
}

export default TabLabel;
