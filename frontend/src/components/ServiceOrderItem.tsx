import type { ServiceOrder, ServiceOrderStatus } from "@/types/serviceOrder";
import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { Pencil } from "lucide-react";
import { TrashSimpleIcon } from "./icons/iconamoon-trash-simple";
import { useState } from "react";

interface ServiceOrderItemProps {
  order: ServiceOrder;
  onStatusChange: (id: number, status: ServiceOrderStatus) => void;
  onDelete: (id: number) => void;
}
export function ServiceOrderItem({
  order,
  onStatusChange,
  onDelete,
}: ServiceOrderItemProps) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  return (
    <div className="p-4 border rounded-md bg-white shadow">
      <div className="mb-2 justify-between">
        <h2 className="text-lg font-semibold">{order.code}</h2>
        <p className="mb-1">
          <strong>Cliente:</strong> {order.client}
        </p>
        <p className="mb-1">
          <strong>Descrição:</strong> {order.description}
        </p>
        <p className="mb-1">
          <strong>Data:</strong> {order.date}
        </p>
        <p className="mb-1">
          <strong>Status:</strong> <StatusBadge status={order.status} />
        </p>
      </div>

      <div className="mt-4 flex space-x-2 justify-end w-full">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value as ServiceOrderStatus);
          }}
        >
          <option value="OPEN">Aberta</option>
          <option value="IN_PROGRESS">Em Andamento</option>
          <option value="DONE">Concluído</option>
          <option value="CANCELED">Cancelado</option>
        </select>
        <Button onClick={() => onStatusChange(order.id, selectedStatus)}>
          <Pencil fontVariant="bold" size={18} />
        </Button>
        <Button onClick={() => onDelete(order.id)}>
          <TrashSimpleIcon fontVariant="bold" size={18} />
        </Button>
      </div>
    </div>
  );
}
export default ServiceOrderItem;
