import { Layout } from "antd";
import Sider from "./Sider";
import SiteContent from "./SiteContent";
import SiteHeader from "./SIteHeader";
import SideDialog from "../../components/SideDialog";

function MainWindow() {
  return (
    <>
      <SideDialog />
      <Layout className="min-h-screen">
        <Sider />
        <Layout className="z-10 max-h-screen overflow-y-auto">
          <SiteHeader />
          <SiteContent />
        </Layout>
      </Layout>
    </>
  );
}

export default MainWindow;
