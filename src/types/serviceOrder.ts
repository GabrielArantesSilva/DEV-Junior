import { ServiceOrder } from "../generated/prisma/client";
export type ServiceOrderStatus = "OPEN" | "IN_PROGRESS" | "DONE" | "CANCELED";


export type ServiceOrderPick = Omit<ServiceOrder, "id" | "createdAt" | "status">;
export type UpdateStatusPick = Pick<ServiceOrder, "status">;

