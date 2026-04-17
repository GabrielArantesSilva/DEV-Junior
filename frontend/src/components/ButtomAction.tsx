import type { ServiceOrder, ServiceOrderStatus } from "@/types/serviceOrder";
import { Button } from "./ui/button";
import { StatusBadge } from "./StatusBadge";
import { Pencil } from "lucide-react";
import { TrashSimpleIcon } from "./icons/iconamoon-trash-simple";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

     interface ServiceOrderItemProps {
    order: ServiceOrder;
    onStatusChange: (id: number, status: ServiceOrderStatus) => void;
    onDelete: (id: number) => void;
  };
  export function ButtomAction({
    order,
    onStatusChange,
    onDelete,
  }: ServiceOrderItemProps) {
    const [selectedStatus, setSelectedStatus] = useState(order.status);
  


 
    return (
      <div className="mt-4 flex space-x-2 justify-end w-full">
        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            setSelectedStatus(value as ServiceOrderStatus)
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Aberta</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
            <SelectItem value="DONE">Concluída</SelectItem>
            <SelectItem value="CANCELED">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => onStatusChange(order.id, selectedStatus)}>
          <Pencil fontVariant="bold" size={18} />
        </Button>
        <Button onClick={() => onDelete(order.id)}>
          <TrashSimpleIcon fontVariant="bold" size={18} />
        </Button>
      </div>
    );
  };

