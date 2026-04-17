import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

import type {
  ServiceOrder,
  CreateServiceOrderDTO,
  UpdateServiceOrderStatusDTO,
} from "../types/serviceOrder";

export async function getServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ServiceOrder[]>("/service-orders");
  return response.data;
}

export async function createServiceOrder(data: CreateServiceOrderDTO) {
  const response = await api.post<ServiceOrder>("/service-orders", data);
  return response.data;
}

export async function updateServiceOrderStatus(
  id: number,
  data: UpdateServiceOrderStatusDTO,
) {
  const response = await api.patch<ServiceOrder>(
    `/service-orders/${id}/status`,
    data,
  );
  return response.data;
}

export async function deleteServiceOrder(id: number) {
  await api.delete(`/service-orders/${id}`);
}
