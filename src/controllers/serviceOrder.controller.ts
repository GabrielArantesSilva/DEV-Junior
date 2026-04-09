import  { Request, Response } from "express";
import {
  createServiceOrder,
  getAllServiceOrders,
  updateServiceOrderStatus,
  deleteServiceOrder,
  isValidStatus,
} from "../services/serviceOrder.service";

async function createServiceOrderController(req: Request, res: Response): Promise<void> {
  try {
    const { code, client, description, date } = req.body;
    const newOrder = await createServiceOrder({ code, client, description, date });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
}

async function deleteServiceOrderController(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID parameter" });
    return;
  }

  const success = await deleteServiceOrder(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Service order not found" });
  }
}

async function getAllServiceOrdersController(req: Request, res: Response): Promise<void> {
  const orders = await getAllServiceOrders();
  res.status(200).json(orders);
}

async function updateServiceOrderStatusController(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID parameter" });
    return;
  }
  const { status } = req.body;
  if (!isValidStatus(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
      
    } 
      const updatedOrder = await updateServiceOrderStatus(id, { status });
  if (updatedOrder) {
    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ error: "Service order not found" });
} 
}

export {
  createServiceOrderController,
  getAllServiceOrdersController,
  updateServiceOrderStatusController,
  deleteServiceOrderController,
};
