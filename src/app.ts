import cors from "cors";
import express, { Response } from "express";
import path from "path";

import { connectDB } from "./db/conection";
import { apiEndpoints } from "./routes/api";

// Create Express server
const app = express();

// Express configuration
app.use(cors());
app.set("port", process.env.PORT ?? 3000);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res: Response) => {
	res.send("Hola api employees");
});

app.use("/api", apiEndpoints);

connectDB().then().catch(console.log);

export default app;
