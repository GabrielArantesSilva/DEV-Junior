import {
  createServiceOrder,
  getAllServiceOrders,
  updateServiceOrderStatus,
} from "./services/serviceOrder.service";
import { UpdateStatusPick } from "./types/serviceOrder";

const os = createServiceOrder({
  code: "os001",
  description: "Troca de óleo",
  client: "João Silva",
  date: new Date("2024-06-01"),
});


console.log("Criou:", os);
console.log("Todas:", getAllServiceOrders());

updateServiceOrderStatus(os.id, { status: "IN_PROGRESS" } as UpdateStatusPick);
const updatedOs = getAllServiceOrders().find((o) => o.id === os.id);
console.log("Atualizou:", updatedOs);
console.log("Atualizou:", getAllServiceOrders());
