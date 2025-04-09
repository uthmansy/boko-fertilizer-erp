import { z } from "zod";
import WarehouseSchema from "../zodSchemas/warehouses";
import { InventoryItemSchema } from "../zodSchemas/inventoryItems";
import { PurchasesSchema, UpdatePurchaseSchema } from "../zodSchemas/purchases";
import { PurchasePaymentSchema } from "../zodSchemas/purchasePayment";
import DispatchSchema from "../zodSchemas/dispatch";
import ReceiveSchema from "../zodSchemas/receive";
import { RequestSchema } from "../zodSchemas/requests";
import {
  ProductionMultipleProductsSchema,
  ProductionSchema,
} from "../zodSchemas/production";
import {
  MultiProductSubmissionSchema,
  ProductSubmissionSchema,
} from "../zodSchemas/submission";
import { userSignUpSchema } from "../zodSchemas/auth";
import { finishedProductsMultipleSchema } from "../zodSchemas/finishedProducts";
import { UpdateSaleSchema } from "../zodSchemas/sales";
import { UpdateExpenseSchema } from "../zodSchemas/expenses";
import { UpdateSaleItemSchema } from "../zodSchemas/saleItem";
import { UpdatePurchaseItemSchema } from "../zodSchemas/purchaseItem";

export type NewWarehouse = z.TypeOf<typeof WarehouseSchema>;
export type NewInventoryItem = z.TypeOf<typeof InventoryItemSchema>;
export type NewPurchase = z.infer<typeof PurchasesSchema>;
export type NewPurchasePayment = z.infer<typeof PurchasePaymentSchema>;
export type Dispatch = z.infer<typeof DispatchSchema>;
export type Receive = z.infer<typeof ReceiveSchema>;
export type CreateRequest = z.infer<typeof RequestSchema>;
export type CreateProduction = z.infer<typeof ProductionSchema>;
export type CreateItemCollection = z.infer<typeof InventoryItemSchema>;
export type AddProductionSubmission = z.infer<typeof ProductSubmissionSchema>;
export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type AddFinishedProducts = z.infer<
  typeof finishedProductsMultipleSchema
>;
export type AddProductionRunsMultiProduct = z.infer<
  typeof ProductionMultipleProductsSchema
>;
export type AddMultiProductsSubmission = z.infer<
  typeof MultiProductSubmissionSchema
>;
export type UpdatePurchaseInput = z.infer<typeof UpdatePurchaseSchema>;
export type UpdateSaleInput = z.infer<typeof UpdateSaleSchema>;
export type UpdateSaleItem = z.infer<typeof UpdateSaleItemSchema>;
export type UpdatePurchaseItem = z.infer<typeof UpdatePurchaseItemSchema>;
export type UpdateExpenseInput = z.infer<typeof UpdateExpenseSchema>;
