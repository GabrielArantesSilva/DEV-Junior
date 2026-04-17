import { getServiceOrders } from "@/services/serviceOrderApi";
import type { ServiceOrder } from "@/types/serviceOrder";
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {

  const [orders, setOrders] = React.useState<ServiceOrder[]>([]);
  async function fetchOrder (){
    const data = await getServiceOrders();
    setOrders(data);
  }
  React.useEffect(() => {
    fetchOrder();
  }, []);


  function getStatusCount(orders: ServiceOrder[]) {
  const statusMap = {
    OPEN: "Aberta",
    IN_PROGRESS: "Em Progresso",
    DONE: "Concluído",
    CANCELED: "Cancelado",
  }; 
  
    return Object.entries(statusMap).map(([status, label]) => ({
      name: label,
      count: orders.filter((order) => order.status === status).length,
    })

    );
  }
function getDailyData(orders: ServiceOrder[]) {
  const counts: Record<string, number> = {};

  orders.forEach((os) => {
    const date = new Date(os.createdAt).toISOString().split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}



  return (
    <div className="min-h-screen bg-gray-50 p-8 border rounded-md pt-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        <div>Total de Ordens de Serviço: {orders.length}</div>
        {/* <div>{getStatusCount(orders)}</div>
        <h3 className="font-semibold ">Ordens Criadas Hoje</h3>
        <div>{getDailyData(orders)} ordens criadas hoje</div> */}
   
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white p-6 rounded-md shadow">
    <h2 className="text-lg font-semibold mb-4">OS por Status</h2>
  
    <PieChart width="100%" height={300}>
      <Pie
        data={getStatusCount(orders)}
        dataKey="count"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {getStatusCount(orders).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={["#0088FE", "#6a6a6a", "#FFBB28", "#FF8042"][index % 4]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
  <div className="bg-white p-6 rounded-md shadow">
    <h2 className="text-lg font-semibold mb-4">OS Criadas por Dia</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={getDailyData(orders)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8b80ff" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
       </div>
    </div>
)}
      

  
export default Dashboard;