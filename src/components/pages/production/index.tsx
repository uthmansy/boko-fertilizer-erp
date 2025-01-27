import { Tabs, TabsProps } from "antd";
import ProductionRuns from "../productionRuns";
import Requests from "../requests";
import ProductSubmissions from "../productSubmissions";
import FinishedProducts from "../finishedProducts";

function Production() {
  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Production Runs",
      children: <ProductionRuns />,
    },
    {
      key: "2",
      label: "Material Requests",
      children: <Requests />,
    },
    {
      key: "3",
      label: "Product Submissions",
      children: <ProductSubmissions />,
    },
    {
      key: "4",
      label: "Finished Products",
      children: <FinishedProducts />,
    },
  ];
  return <Tabs size="large" defaultActiveKey="1" items={tabs} />;
}

export default Production;
