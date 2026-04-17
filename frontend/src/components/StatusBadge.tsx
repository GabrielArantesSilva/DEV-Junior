import type { ServiceOrderStatus } from "@/types/serviceOrder";
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: ServiceOrderStatus;
}



export function statusLabel(status: ServiceOrderStatus): string {
  switch (status) {
    case "OPEN":
        return "Aberta";
    case "IN_PROGRESS":
        return "Em Progresso";
    case "DONE":
        return "Concluído";
    case "CANCELED":
        return "Cancelado";
  }
}; 

function statusColor(status: ServiceOrderStatus): string {
  switch (status) {
    case "OPEN":
      return "bg-blue-100 text-blue-800";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800";
    case "DONE":
      return "bg-green-100 text-green-800";
    case "CANCELED":
      return "bg-red-100 text-red-800";
  }
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const colorClasses = statusColor(status);
  return (
    <Badge className={colorClasses}>
      {statusLabel(status)}
    </Badge>
  );
}
