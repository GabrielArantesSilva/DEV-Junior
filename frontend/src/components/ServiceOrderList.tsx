import type { ServiceOrder, ServiceOrderStatus } from "@/types/serviceOrder";
import { ServiceOrderItem } from "./ServiceOrderItem";

interface ServiceOrderListProps {
  orders: ServiceOrder[];
  onStatusChange: (id: number, status: ServiceOrderStatus) => void;
  onDelete: (id: number) => void;
}

export function ServiceOrderList({
  orders,
  onStatusChange,
  onDelete,
}: ServiceOrderListProps) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nenhuma ordem de serviço encontrada.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <ServiceOrderItem
          key={order.id}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          order={order}
        />
      ))}
    </div>
  );
}
export default ServiceOrderList;
