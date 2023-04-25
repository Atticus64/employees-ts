import express, { Response } from "express";
import path from "path";
import cors from 'cors';

import { connectDB } from "./db/conection";
import { apiEndpoints } from "./routes/api";
import { Employee } from "./models/employee";

// Create Express server

const app = express();
// Express configuration
app.use(cors())
app.set("port", process.env.PORT ?? 3000);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res: Response) => {
  res.send("Hola api employees");
});

app.get("/test", async (_req, res: Response) => {
  const resp = await Employee.updateMany({}, { $rename: { 'admissionData': 'admissionDate' } })

  console.log(resp)

  res.send('ya')
});

app.use("/api", apiEndpoints);

connectDB().then().catch(console.log);

export default app;
