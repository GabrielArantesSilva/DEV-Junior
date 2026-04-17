// pages/list.tsx
import React from "react";
import type { ServiceOrder, ServiceOrderStatus } from "@/types/serviceOrder";
import { getServiceOrders, updateServiceOrderStatus, deleteServiceOrder } from "@/services/serviceOrderApi";
import { StatusBadge } from "@/components/StatusBadge";
import { ButtomAction } from "../components/ButtomAction";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
export function List() {
  // 1. Estado
  const [orders, setOrders] = React.useState<ServiceOrder[]>([]);

  // 2. Buscar dados
  async function fetchOrders() {
    const data = await getServiceOrders();
    setOrders(data);
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  // 3. Handlers
  async function handleStatusChange(id: number, status: ServiceOrderStatus) {
    await updateServiceOrderStatus(id, { status });
    fetchOrders();
    toast("Status atualizado");
  }

  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    fetchOrders();
    toast("OS excluída");
  }

  // 4. Return — UMA tabela, o .map gera as linhas
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Listagem de OS</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.code}</TableCell>
              <TableCell>{order.client}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell><StatusBadge status={order.status} /></TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <ButtomAction
  order={order}
  onStatusChange={handleStatusChange}
  onDelete={handleDelete}
/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}