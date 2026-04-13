import express from "express";
import dotenv from "dotenv";
import serviceOrderRoutes from "./routes/serviceOrder.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/service-orders", serviceOrderRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/service-orders`);
});
