import { Layout, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../constants/ROUTES";
import Warehouses from "../../components/pages/warehouses";
import InventoryItems from "../../components/pages/inventoryItems.tsx";
import Purchases from "../../components/pages/purchases/index.tsx";
import ExternalDispatch from "../../components/pages/externalDispatch/index.tsx";
import Home from "../../components/pages/home/index.tsx";
import StockRecords from "../../components/pages/stockRecords/index.tsx";
import ExternalStockRecords from "../../components/pages/externalStockRecords/index.tsx";
import Transit from "../../components/pages/transit/index.tsx";
import Requests from "../../components/pages/requests/index.tsx";
import ProductionRuns from "../../components/pages/productionRuns/index.tsx";
import ProductSubmissions from "../../components/pages/productSubmissions/index.tsx";
import Sales from "../../components/pages/sales/index.tsx";
import InternalDispatch from "../../components/pages/internalDispatch/index.tsx";
import InventoryTransfers from "../../components/pages/inventoryTransfers/index.tsx";
import ReceivedVehicles from "../../components/pages/receivedVehicles/index.tsx";
import DispatchedVehicles from "../../components/pages/dispatchedVehicles/index.tsx";
import Employees from "../../components/pages/employees/index.tsx";
import Departments from "../../components/pages/departments/index.tsx";
import Positions from "../../components/pages/positions/index.tsx";
import Payrolls from "../../components/pages/payrolls/index.tsx";
import Expenses from "../../components/pages/expenses/index.tsx";
import Enrollment from "../../components/pages/enrollment/index.tsx";
import UserManagement from "../../components/pages/userManagement/index.tsx";
import { LOGO } from "../../assets/images/index.ts";
import ScanWaybill from "../../components/pages/scanWaybill/index.tsx";
import FinancialReports from "../../components/pages/financialReports/index.tsx";
import StockIn from "../../components/pages/stockIn/index.tsx";
import DailyProduction from "../../components/pages/dailyProduction/index.tsx";
import Invoices from "../../components/pages/invoices/index.tsx";
import FinishedProducts from "../../components/pages/finishedProducts/index.tsx";

const { Content } = Layout;

function SiteContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      className="m-5 mx-0 md:mx-5 p-5 md:p-10 overflow-y-auto"
      style={{
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${LOGO})`,
          backgroundSize: "75%", // Adjust the size as needed
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.08, // Faint effect
        }}
      ></div>
      <div className="relative">
        <Routes>
          <Route path={`${ROUTES.home}/*`} element={<Home />} />
          <Route path={`${ROUTES.warehouses}/*`} element={<Warehouses />} />
          <Route
            path={`${ROUTES.inventoryItems}/*`}
            element={<InventoryItems />}
          />
          <Route path={`${ROUTES.purchases}/*`} element={<Purchases />} />
          <Route path={`${ROUTES.sales}/*`} element={<Sales />} />
          <Route path={`${ROUTES.stockRecords}/*`} element={<StockRecords />} />
          <Route path={`${ROUTES.stockIn}/*`} element={<StockIn />} />
          <Route
            path={`${ROUTES.externalStockRecords}/*`}
            element={<ExternalStockRecords />}
          />
          <Route
            path={`${ROUTES.externalDispatch}/*`}
            element={<ExternalDispatch />}
          />
          <Route
            path={`${ROUTES.internalDispatch}/*`}
            element={<InternalDispatch />}
          />
          <Route path={`${ROUTES.transit}/*`} element={<Transit />} />
          <Route path={`${ROUTES.scanWaybill}/*`} element={<ScanWaybill />} />
          <Route
            path={`${ROUTES.receivedVehicles}/*`}
            element={<ReceivedVehicles />}
          />
          <Route
            path={`${ROUTES.dispatchedVehicles}/*`}
            element={<DispatchedVehicles />}
          />
          <Route path={`${ROUTES.requests}/*`} element={<Requests />} />
          <Route
            path={`${ROUTES.productionRuns}/*`}
            element={<ProductionRuns />}
          />
          <Route
            path={`${ROUTES.productSubmissions}/*`}
            element={<ProductSubmissions />}
          />
          <Route
            path={`${ROUTES.inventoryTransfers}/*`}
            element={<InventoryTransfers />}
          />
          <Route path={`${ROUTES.employees}/*`} element={<Employees />} />
          <Route path={`${ROUTES.departments}/*`} element={<Departments />} />
          <Route path={`${ROUTES.positions}/*`} element={<Positions />} />
          <Route path={`${ROUTES.payroll}/*`} element={<Payrolls />} />
          <Route path={`${ROUTES.expenses}/*`} element={<Expenses />} />
          <Route
            path={`${ROUTES.financialReports}/*`}
            element={<FinancialReports />}
          />
          <Route path={`${ROUTES.enrollment}/*`} element={<Enrollment />} />
          {/* <Route
              path={`${ROUTES.transportFees}/*`}
              element={<TransportFees />}
            /> */}
          <Route
            path={`${ROUTES.userManagement}/*`}
            element={<UserManagement />}
          />
          <Route
            path={`${ROUTES.dailyProduction}/*`}
            element={<DailyProduction />}
          />
          <Route path={`${ROUTES.invoices}/*`} element={<Invoices />} />
          <Route
            path={`${ROUTES.finishedProducts}/*`}
            element={<FinishedProducts />}
          />
        </Routes>
      </div>
    </Content>
  );
}

export default SiteContent;
