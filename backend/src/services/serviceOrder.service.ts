import prisma from "../lib/prisma";
import { ServiceOrder } from "../generated/prisma/client";
import {
  ServiceOrderPick,
  UpdateStatusPick,
  ServiceOrderStatus,
} from "../types/serviceOrder";

function formatCode(code: string): string {
  return code.toUpperCase().trim();
}

function isValidStatus(value: string): value is ServiceOrderStatus {
  return ["OPEN", "IN_PROGRESS", "DONE", "CANCELED"].includes(value);
}

async function createServiceOrder(data: ServiceOrderPick): Promise<ServiceOrder> {
  const newOrder = await prisma.serviceOrder.create({
  data: {
    code: formatCode(data.code),
    client: data.client,
    description: data.description,
    date: new Date(data.date),
  }
});
  return newOrder;
}

async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  return await prisma.serviceOrder.findMany({ orderBy: { id: "asc" } });
}

async function updateServiceOrderStatus(
  id: number,
  data: UpdateStatusPick
): Promise<ServiceOrder | null> {
const order = await prisma.serviceOrder.findUnique({ where: { id } });
if (!order) {
  return null;
}
const updated = await prisma.serviceOrder.update({
  where: { id },
  data: { status: data.status },
});
return updated;
}

async function deleteServiceOrder(id: number): Promise<boolean> {
  const order = await prisma.serviceOrder.findUnique({ where: { id } });
  if (!order) {
    return false;
  }
  await prisma.serviceOrder.delete({ where: { id } });
  return true;
}

export {
  createServiceOrder,
  getAllServiceOrders,
  updateServiceOrderStatus,
  deleteServiceOrder,
  isValidStatus,
};