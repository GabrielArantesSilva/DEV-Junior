import ServiceOrderForm from "./components/ServiceOrderForm";
import "./App.css";
import { ServiceOrderItem } from "./components/ServiceOrderItem";
import { ServiceOrderList } from "./components/ServiceOrderList";
import React from "react";
import type { ServiceOrder, ServiceOrderStatus } from "./types/serviceOrder";
import {
  deleteServiceOrder,
  getServiceOrders,
  updateServiceOrderStatus,
} from "./services/serviceOrderApi";

function App() {
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
  }
  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    fetchOrders();
  }
  async function handleCreate() {
    fetchOrders();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 border rounded-md">
      <div className="max-w-2xl mx-auto">
        <ServiceOrderForm onCreated={handleCreate} />
        <ServiceOrderList
          orders={orders}
          onStatusChange={handleSubmitStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
