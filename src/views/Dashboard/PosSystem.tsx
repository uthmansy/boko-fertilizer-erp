import { Layout } from "antd";
import SiteHeader from "./SIteHeader";
import PosCheckout from "../../components/pages/posCheckout";

function PosSystem() {
  return (
    <Layout className="min-h-screen">
      <Layout className="z-10 max-h-screen overflow-y-auto">
        <SiteHeader />
        <PosCheckout />
      </Layout>
    </Layout>
  );
}

export default PosSystem;
