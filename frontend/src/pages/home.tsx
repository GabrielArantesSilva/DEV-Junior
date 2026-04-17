import ServiceOrderForm from "../components/ServiceOrderForm";
import React from "react";
import type { ServiceOrder, ServiceOrderStatus } from "../types/serviceOrder";
import {
  deleteServiceOrder,
  getServiceOrders,
  updateServiceOrderStatus,
} from "../services/serviceOrderApi";
import { toast, Toaster } from "sonner";
import { ServiceOrderList } from "@/components/ServiceOrderList";

function Home() {
  const [orders, setOrders] = React.useState<ServiceOrder[]>([]);

  async function fetchOrders() {
    const data = await getServiceOrders();
    setOrders(data);
  }
  React.useEffect(() => {
    fetchOrders();
  }, []);

  async function handleSubmitStatusChange(
    id: number,
    status: ServiceOrderStatus,
    
  ) {
    await updateServiceOrderStatus(id, { status });
    fetchOrders();
    toast("Status atualizado", {
      description: "Ação realizada com sucesso",
    });
  }
  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    fetchOrders();
    toast("Ordem de Serviço deletada", {
      description: "Ação realizada com sucesso",
    });
  }
  async function handleCreate() {
    fetchOrders();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 border rounded-md pt-10">
      <h1 className=" font-bold text-2xl mb-5 uppercase ">Cadastro de Ordens de Serviço</h1>
      <div className="max-w-2xl mx-auto">

        <ServiceOrderForm onCreated={handleCreate} />
      </div>
      <div className="mt-3" />
   <ServiceOrderList
        orders={orders.slice(-3).reverse()}
        onStatusChange={handleSubmitStatusChange}
        onDelete={handleDelete}
      />
  
    </div>
    
  );
}

export default Home;
