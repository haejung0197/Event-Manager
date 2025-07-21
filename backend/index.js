import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import router from "./routes/eventRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", router);
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
