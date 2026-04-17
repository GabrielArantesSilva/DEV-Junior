import { useState } from "react";
import { createServiceOrder } from "@/services/serviceOrderApi";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ServiceOrderFormProps {
  onCreated: () => void;
}

function ServiceOrderForm(props: ServiceOrderFormProps) {
  const [code, setCode] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    await createServiceOrder({ code, client, description, date });
    setCode("");
    setClient("");
    setDescription("");
    setDate("");
    props.onCreated();
    toast("Ordem de Serviço criada", {
      description: "Ação realizada com sucesso",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md bg-white shadow sm:p-6 pg-6 mg-6"
    >
      <h1 className="mb-6 font-bold text-xl">Ordens de Serviço</h1>
      <div>
        <Label htmlFor="code" className="mb-2">
          Codigo
        </Label>
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div>
        <Label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Cliente
        </Label>
        <Input
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
      </div>
      <div>
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Descrição
        </Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 min-h-[50px] max-h-[100px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <Label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Data
        </Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <Button type="submit">Criar OS</Button>
    </form>
  );
}
export default ServiceOrderForm;
