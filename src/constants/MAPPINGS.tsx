import { UserRole } from "../types/db";
import { SidebarMenuItem } from "../types/menu";
import {
  accountingMenuItems,
  adminMenuItems,
  defaultMenuItems,
  inventoryMenuItems,
  logisticsMenuItems,
  managerMenuItems,
  productionMenuItems,
  superAdminMenuItems,
} from "./MENUS";

export const sidebarMenuMapping: Record<UserRole, SidebarMenuItem[]> = {
  DEFAULT: defaultMenuItems,
  "SUPER ADMIN": superAdminMenuItems,
  ACCOUNTING: accountingMenuItems,
  ADMIN: adminMenuItems,
  INVENTORY: inventoryMenuItems,
  LOGISTICS: logisticsMenuItems,
  MANAGER: managerMenuItems,
  PRODUCTION: productionMenuItems,
};
