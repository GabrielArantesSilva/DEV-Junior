
export type ServiceOrderStatus = "OPEN" | "IN_PROGRESS" | "DONE" | "CANCELED";

export interface ServiceOrder {
  id: number;
  code: string;
  client: string;
  description: string;
  date: string;
  status: ServiceOrderStatus;
  createdAt: string;
}

export interface CreateServiceOrderDTO {
  code: string;
  client: string;
  description: string;
  date: string; // ISO date string
}

export interface UpdateServiceOrderStatusDTO {
  status: ServiceOrderStatus;
}
